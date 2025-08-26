import React, { useEffect, useState } from "react";
import axios from "axios";
import SockJS from "sockjs-client";
import { over } from "stompjs";

let stompClient = null;

const container = {
  fontFamily: "Inter, system-ui, Arial, sans-serif",
  padding: "24px",
  background: "#f5f7fb",
  minHeight: "100vh"
};
const card = {
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
  padding: "20px",
  marginBottom: "16px"
};
const button = {
  padding: "10px 16px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  background: "#2563eb",
  color: "#fff",
  fontWeight: 600
};
const input = {
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  minWidth: "260px"
};
const select = input;
const table = {
  width: "100%",
  borderCollapse: "collapse"
};
const th = { textAlign: "left", padding: "12px", background: "#eef2ff" };
const td = { padding: "12px", borderTop: "1px solid #e5e7eb" };

function App() {
  const [issues, setIssues] = useState([]);
  const [issueType, setIssueType] = useState("Billing");
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/api/issues").then((res) => setIssues(res.data));

    const socket = new SockJS("http://localhost:8080/ws");
    stompClient = over(socket);
    stompClient.connect({}, () => {
      stompClient.subscribe("/topic/issues", (message) => {
        const newIssue = JSON.parse(message.body);
        setIssues((prev) => [...prev, newIssue]);
      });
    });
  }, []);

  const submitIssue = async (e) => {
    e.preventDefault();
    if (!description.trim()) return;
    await axios.post("http://localhost:8080/api/issues", { issueType, description });
    setDescription("");
  };

  return (
    <div style={container}>
      <h1 style={{ marginBottom: 16 }}>📞 Telecom Support</h1>

      <div style={card}>
        <h2 style={{ marginTop: 0 }}>Raise a Ticket</h2>
        <form onSubmit={submitIssue}>
          <label>
            Issue Type:&nbsp;
            <select style={select} value={issueType} onChange={(e) => setIssueType(e.target.value)}>
              <option>Billing</option>
              <option>Plan</option>
              <option>Network</option>
            </select>
          </label>
          <span style={{ display: "inline-block", width: 12 }}></span>
          <label>
            Description:&nbsp;
            <input
              style={input}
              placeholder="Describe your issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <span style={{ display: "inline-block", width: 12 }}></span>
          <button style={button} type="submit">Submit</button>
        </form>
      </div>

      <div style={card}>
        <h2 style={{ marginTop: 0 }}>Admin Dashboard (Realtime)</h2>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>ID</th>
              <th style={th}>Issue Type</th>
              <th style={th}>Description</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue.id}>
                <td style={td}>{issue.id}</td>
                <td style={td}>{issue.issueType}</td>
                <td style={td}>{issue.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
