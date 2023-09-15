import { toast } from "react-hot-toast";

export const saveUser = async (user) => {
  const currentUser = {
    email: user?.email,
    name: user?.displayName ? user.displayName : user.name,
    photo: user?.photoURL,
    role: "user",
    status: "normal",
  };

  try {
    const response = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentUser),
    });

    const data = await response.json();
    console.log(data);

    if (data.acknowledged === true) {
      toast.success("User saved successfully!");
    } else {
      toast.success(data.message);
    }
  } catch (error) {
    console.error("Error saving user:", error);
  }
};
