import { createClient } from "connect.io";
const clientInBackground = createClient({
  namespace: "contentPage",
}); // the tab id you want to connect

export default clientInBackground
