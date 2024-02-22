import { Button } from "@mui/material";
import "./DeleteButton.css";
import notificationService from "../../../Services/NotificationService";
import { useNavigate } from "react-router-dom";
import userService from "../../../Services/UserService";
import { AuthAction, AuthActionTypes, authStore } from "../../../Redux/AuthState";

function DeleteButton({
  userUuid,
  setUserInSystem,
}: {
  userUuid: string;
  setUserInSystem: Function;
}): JSX.Element {
  const navigate = useNavigate();

  const deleteUser = async () => {
    try {
      if (!confirm("Delete user?")) return notificationService.success("Phew that was scarry😨");
      await userService.deleteUser(userUuid);      
      const action: AuthAction = { type: AuthActionTypes.Logout };
      authStore.dispatch(action);
      setUserInSystem(false);
      navigate("/auth/login");
    } catch (err: any) {
      notificationService.error("Error deleting user");
    } finally {}
  };

  return (
    <Button
      color="error"
      variant="contained"
      sx={{ mt: 1 }}
      onClick={deleteUser}
    >
      Delete User
    </Button>
  );
}

export default DeleteButton;
