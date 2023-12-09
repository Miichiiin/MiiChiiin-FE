import { useState } from 'react';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleOldPasswordChange = (e:any) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e:any) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e:any) => {
    setConfirmPassword(e.target.value);
  };

  const toggleShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();

    // TODO: Add logic to handle password change submission
    if (newPassword === confirmPassword) {
      // Call your API or authentication service to change the password
      console.log('Password change submitted:', { oldPassword, newPassword });
      // You may want to redirect or show a success message here
    } else {
      // Handle password mismatch error
      console.error('New password and confirm password do not match');
    }
  };

  return (
    <div className="bg-white shadow-md border border-gray-300  mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 mt-8 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-2xl">
      <section>
        <div className="mx-auto ">
          <div className="flex items-center justify-between border-b-2 pb-3 mt-[-15px]">
            <header className="">
              <h2 className="font-bold text-[20px]"> Đổi Mật Khẩu</h2>
            </header>
            <div className="mr-5 flex items-center"></div>
          </div>
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="mb-4 relative">
              <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">
                Mật khẩu cũ
              </label>
              <input
                type={showOldPassword ? 'text' : 'password'}
                id="oldPassword"
                name="oldPassword"
                value={oldPassword}
                onChange={handleOldPasswordChange}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
              <span
                className="absolute right-2 top-2 cursor-pointer mt-6"
                onClick={toggleShowOldPassword}
              >
                {showOldPassword ? '👁️' : '👁️‍🗨️'}
              </span>
            </div>
            <div className="mb-4 relative">
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                Mật khẩu mới
              </label>
              <input
                type={showNewPassword ? 'text' : 'password'}
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={handleNewPasswordChange}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
              <span
                className="absolute right-2 top-2 cursor-pointer mt-6"
                onClick={toggleShowNewPassword}
              >
                {showNewPassword ? '👁️' : '👁️‍🗨️'}
              </span>
            </div>
            <div className="mb-4 relative">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Xác nhận mật khẩu mới
              </label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
              <span
                className="absolute right-2 top-2 cursor-pointer mt-6"
                onClick={toggleShowConfirmPassword}
              >
                {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
              </span>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className=" px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:border-indigo-500"
              >
                Đổi Mật Khẩu
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ChangePassword;
