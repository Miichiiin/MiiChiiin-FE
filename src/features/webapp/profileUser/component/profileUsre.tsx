import { CSSProperties, useEffect, useState } from "react";
import FadeLoader from "react-spinners/HashLoader";
const UserProfileForm = () => {
  const [user, setUser] = useState({
    email: "",
    phone: "",
    date: "",
    gender: "",
    cccd: "",
    nationality: "",
    address:""

  });
   //loading trang
   const [loading,setLoading] = useState(false);
   useEffect(() =>{
       setLoading(true)
       setTimeout(() =>{
        setLoading(false)
       },1000)
   },[]);  
   const override: CSSProperties = {
       display: "flex",
       position:"fixed",
       top: "60%",
       left: "59%",
       transform: "translate(-50%, -50%)",
   };
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleChange = (e: any) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <div>
          <div className="container mx-auto py-8">
            <div className="bg-white rounded-lg shadow-lg p-8 h-[550px]">
              <h2 className="font-bold text-[20px]">Thông tin tài khoản</h2>
              <hr className="mt-5 text-gray-400" />
              {
        loading ?
          <div className="relative">
              <FadeLoader 
              color="#d7ba37"
              loading={loading}
              cssOverride={override}
              className="animate-pulse absolute z-10"
              />
            </div>
            :
             <div>
               <div className="grid grid-cols-2 space-x-8 items-center mb-6"></div>
                <div className="mb-6 ">
                <div className="flex flex-wrap">
                  <div className="w-full md:w-1/2 lg:w-1/3 mb-4 mx-5">
                    <label
                      className="block text-sm text-gray-600 font-bold mb-1"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="bg-gray-100 rounded-lg px-4 py-2 w-full"
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full md:w-1/2 lg:w-1/3 mb-4 mx-5">
                    <label
                      className="block text-sm text-gray-600 font-bold mb-1"
                      htmlFor="phone"
                    >
                      Số điện thoại
                    </label>
                    <input
                      className="bg-gray-100 rounded-lg px-4 py-2 w-full"
                      type="tel"
                      name="phone"
                      value={user.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full md:w-1/2 lg:w-1/3 mb-4 mx-5">
                    <label
                      className="block text-sm text-gray-600 font-bold mb-1"
                      htmlFor="dob"
                    >
                      Sinh nhật
                    </label>
                    <input
                      className="bg-gray-100 rounded-lg px-4 py-2 w-full"
                      type="date"
                      name="dob"
                      value={user.date}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full md:w-1/2 lg:w-1/3 mb-4 mx-5">
                    <label
                      className="block text-sm text-gray-600 font-bold mb-1"
                      htmlFor="gender"
                    >
                      Giới tính
                    </label>
                    <select
                      className="bg-gray-100 rounded-lg px-4 py-2 w-full"
                      name="gender"
                      value={user.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option value="0">Male</option>
                      <option value="1">Female</option>
                      <option value="2">Other</option>
                    </select>
                  </div>
                  <div className="w-full md:w-1/2 lg:w-1/3 mb-4 mx-5">
                    <label
                      className="block text-sm text-gray-600 font-bold mb-1"
                      htmlFor="cccd"
                    >
                      Căn cước công dân
                    </label>
                    <input
                      className="bg-gray-100 rounded-lg px-4 py-2 w-full"
                      type="text"
                      name="cccd"
                      value={user.cccd}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full md:w-1/2 lg:w-1/3 mb-4 mx-5">
                    <label
                      className="block text-sm text-gray-600 font-bold mb-1"
                      htmlFor="nationality"
                    >
                      Quốc tịch
                    </label>
                    <input
                      className="bg-gray-100 rounded-lg px-4 py-2 w-full"
                      type="text"
                      name="nationality"
                      value={user.nationality}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full md:w-1/2 lg:w-1/3 mb-4 mx mx-5">
                    <label
                      className="block text-sm text-gray-600 font-bold mb-1"
                      htmlFor="address"
                    >
                      Địa chỉ
                    </label>
                    <textarea
                      className="bg-gray-100 rounded-lg px-4 py-2 w-full"
                      name="address"
                      value={user.address}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-blue-500 text-white font-bold py-2 px-6 rounded-md transform transiton-transform hover:scale-105 duration-300"
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
             </div>
              }
            </div>
          </div>
      
    </div>
  );
};

export default UserProfileForm;
