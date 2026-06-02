function AdminProfile() {
  const userId = localStorage.getItem("userId");
  const emri = localStorage.getItem("emri");
  const mbiemri = localStorage.getItem("mbiemri");
  const role = localStorage.getItem("role");

  return (
    <div className="container mt-4">
      <h2>Admin Profile</h2>

      <div className="card p-4">
        <p><strong>ID:</strong> {userId}</p>
        <p><strong>Name:</strong> {emri} {mbiemri}</p>
        <p><strong>Role:</strong> {role}</p>
      </div>
    </div>
  );
}

export default AdminProfile;