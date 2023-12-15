import { useEffect, useState } from "react";
import { useChange_passwordMutation } from "@/api/webapp/change_password";
import { message } from "antd";


const ChangePassword = () => {
  const [user, setUser] = useState({
    id: ""
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [changePasswordMutation] = useChange_passwordMutation();

  const handlePasswordChange = (e: any, _: any) => {
    const newPasswordValue = e.target.value;
    setNewPassword(newPasswordValue);
    checkPasswordStrength(newPasswordValue);
  };

  const toggleShowPassword = (setter: any) => {
    setter((prev: any) => !prev);
  };

  const checkPasswordStrength = (password: any) => {
    if (password.length < 8) {
      setPasswordStrength("Mật khẩu quá ngắn");
    } else {
      setPasswordStrength("");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (newPassword === confirmPassword) {
        if (passwordStrength === "") {
          await changePasswordMutation({
            id_user: user?.id,
            old_password: oldPassword,
            new_password: newPassword,
          }).unwrap().then(() => {
            message.success('Đổi mật khẩu thành công!');
          }).catch(() => {
            message.error('Đổi mật khẩu thất bại!');
          });

          
          setErrorMessage("");
        } else {
          setSuccessMessage("");
          message.error("Mật khẩu mới không đủ mạnh");
        }
      } else {
      
        setSuccessMessage("");
        message.error("Mật khẩu mới và xác nhận mật khẩu không khớp");
      }
    } catch (error) {
      console.error("Đổi mật khẩu thất bại:", error);

  
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md border border-gray-300 mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 mt-8 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-2xl">
      <section>
        <div className="mx-auto">
          <div className="flex items-center justify-between border-b-2 pb-3 mt-[-15px]">
            <header className="">
              <h2 className="font-bold text-[20px]"> Đổi Mật Khẩu</h2>
            </header>
            <div className="mr-5 flex items-center"></div>
          </div>
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="mb-4 relative">
              <label
                htmlFor="oldPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Mật khẩu cũ
              </label>
              <input
                type={showOldPassword ? "text" : "password"}
                id="oldPassword"
                name="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
              <span
                className="absolute right-2 top-2 cursor-pointer mt-6"
                onClick={() => toggleShowPassword(setShowOldPassword)}
              >
                {showOldPassword ? "👁️" : "👁️‍🗨️"}
              </span>
            </div>
            <div className="mb-4 relative">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Mật khẩu mới
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={(e) => handlePasswordChange(e, setNewPassword)}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
              <span
                className="absolute right-2 top-2 cursor-pointer mt-6"
                onClick={() => toggleShowPassword(setShowNewPassword)}
              >
                {showNewPassword ? "👁️" : "👁️‍🗨️"}
              </span>
            </div>
            <div className="mb-4 relative">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Xác nhận mật khẩu mới
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
              <span
                className="absolute right-2 top-2 cursor-pointer mt-6"
                onClick={() => toggleShowPassword(setShowConfirmPassword)}
              >
                {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
              </span>
            </div>
            <div className="mb-4">
              {passwordStrength && (
                <p className="text-red-500 text-sm">{passwordStrength}</p>
              )}
            </div>
            <div className="mb-4">
              {successMessage && (
                <p className="text-green-500 text-sm">{successMessage}</p>
              )}
              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:border-indigo-500"
                disabled={loading}
              >
                {loading ? "Đang xử lý..." : "Đổi Mật Khẩu"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ChangePassword;
