import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import Loading from "../components/Loading";

export default function useRole() {
  const { user } = useAuth();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`https://creative-hut-server.vercel.app/users`);
      if (!res.ok) throw new Error("Failed to fetch users");
      return res.json();
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  // console.log(users);
  const currentUser = users?.filter((entry) => user?.email === entry.email)[0];
  // console.log(currentUser)
  const role = currentUser?.role;
  if (!currentUser || !role) {
    return <Loading />;
  }
  // console.log(role);

  return role;
}
