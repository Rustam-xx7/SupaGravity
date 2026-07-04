import "./App.css";
import { Editor } from "@monaco-editor/react";
import { MonacoBinding } from "y-monaco";
import { useRef, useMemo, useState, useEffect } from "react";
import * as Y from "yjs";
import { SocketIOProvider } from "y-socket.io";

function App() {
  const editorRef = useRef(null);
  // url se username ko get karke usko useSate mein store kar denge
  const [userName, setUserName] = useState(() => {
    return new URLSearchParams(window.location.search).get("username") || "";
  });
  // jitne bhi users hai unka list
  const [userList, setUserList] = useState([]);

  const ydoc = useMemo(() => new Y.Doc(), []); // ispe yjs sare files and use code ko store karta hai , and jo bhi changes hota hai sirf usko yjs update karta hai.

  const yText = useMemo(() => ydoc.getText("monaco"), [ydoc]); // ytext sift ek file ko store karta hai and uske code ko check karta hai .

  const handleMount = (editor) => {
    editorRef.current = editor;

    // monacobinding monaco editor ko yjs ke sath bind karke realtime canges ko track karta hai .
    new MonacoBinding(
      yText,
      editorRef.current.getModel(),
      new Set([editorRef.current]),
    );
  };

  const handleJoin = (e) => {
    e.preventDefault();
    const name = e.target.username.value.trim();
    if (name) {
      setUserName(name);
    }
    window.history.pushState(
      // url ko use karke username ko store karlta hai
      {},
      "",
      "?username=" + e.target.username.value.trim(),
    );
  };

  //useEffect ko use karke yjs monaco sab ko connect karne ka kaam karenge .
  useEffect(() => {
    console.log("userName", userName);
    if (userName) {
      const provider = new SocketIOProvider(
        "/",
        "monaco",
        ydoc,
        { autoConnect: true },
      );

      // awareness basically handle the all the users who are connected and their states .

      provider.awareness.setLocalStateField("user", { userName }); // ek user nam ka field create kar rahe hai awareness mein .

      const syncUserList = () => {
        const states = Array.from(provider.awareness.getStates().values());

        console.log("User states:", states);
        setUserList(
          states
            .filter((state) => state?.user?.userName)
            .map((state) => ({ userName: state.user.userName })),
        ); // jitne bhi users hai unko set kar denge userList mein
      };

      provider.awareness.on("change", syncUserList);
      syncUserList();
    
      function handleBeforeUnload() {
        provider.awareness.setLocalStateField("user", null); // jab user disconnect hoga to uska state null kar denge
      }

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        provider.awareness.off("change", syncUserList);
        provider.disconnect();
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [userName, ydoc]);

  if (!userName) {
    return (
      <main className="App h-screen w-full bg-slate-950 flex gap-4 p-4 items-center justify-center">
        <form
          onSubmit={handleJoin}
          className="flex flex-col gap-4 items-center"
        >
          <input
            type="text"
            placeholder="Enter your name"
            className="p-2 rounded-lg text-white bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-amber-50"
            name="username"
          />
          <button
            type="submit"
            className="rounded-lg bg-amber-50 text-gray-950 font-bold w-full p-2"
          >
            Join
          </button>
        </form>
      </main>
    );
  }
  return (
    <main className="App h-screen w-full bg-slate-950 flex gap-4 p-4">
      <aside className="h-full w-1/4 bg-amber-50 rounded-lg overflow-y-hidden">
        <h2 className="text-lg font-bold text-gray-950 p-4">Users</h2>
        <ul className="p-4">
          {userList.map((state, index) => (
            <li key={index} className="bg-gray-950 text-amber-50 p-2 rounded-lg mb-2">
              {state.userName || "Anonymous"}
            </li>
          ))}
        </ul>
      </aside>
      <section className="h-full w-3/4 bg-neutral-800 rounded-lg overflow-hidden">
        <Editor
          height="100%"
          language="javascript"
          theme="vs-dark"
          defaultValue="// Write your code here"
          onMount={handleMount}
        />
      </section>
    </main>
  );
}

export default App;
