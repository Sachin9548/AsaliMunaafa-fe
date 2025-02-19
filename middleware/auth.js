export default async function ({ redirect }) {
  let token = sessionStorage.getItem("token");
  if (!token) {
    return redirect("/login");
  }
}
