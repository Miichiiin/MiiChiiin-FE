import React, { useState, useEffect } from "react";
import { AiOutlineShoppingCart, AiFillDelete } from "react-icons/ai";
import { Dropdown, Menu } from "antd";

const Cart = () => {
  const [roomList, setRoomList] = useState([
    {
      id: 1,
      nameRoom: "Phòng Đơn",
      nameHotel: "Khách sạn MiChii Đà Nẵng",
      price: 200,
      image:
        "https://booking-static.vinpearl.com/room_types/be5c1e189982470b8968ef37841168ee_VH1PQ_Standard%20Room1.jpg",
      date: "20/09/2023 - 24/09/2023",
    },
    {
      id: 2,
      nameRoom: "Phòng View Biển",
      nameHotel: "Khách sạn MiChii Đà Nẵng",
      price: 250,
      image:
        "https://booking-static.vinpearl.com/room_types/be5c1e189982470b8968ef37841168ee_VH1PQ_Standard%20Room1.jpg",
      date: "20/09/2023 - 24/09/2023",
    },
    {
      id: 3,
      nameRoom: "Phòng Đơn",
      nameHotel: "Khách sạn MiChii Đà Nẵng",
      price: 400,
      image:
        "https://booking-static.vinpearl.com/room_types/be5c1e189982470b8968ef37841168ee_VH1PQ_Standard%20Room1.jpg",
      date: "20/09/2023 - 24/09/2023",
    },
  ]);

  const [roomToDelete, setRoomToDelete] = useState(null);
  const [isCartHovered, setIsCartHovered] = useState(false);
  const [selectedRoomCount, setSelectedRoomCount] = useState(0); // Số phòng đã chọn

  useEffect(() => {
    // Tính toán số phòng đã chọn dựa trên danh sách phòng
    setSelectedRoomCount(roomList.length);
  }, [roomList]);

  const handleRemoveRoom = (roomId:any) => {
    // Nếu phòng đang trong trạng thái "đang xóa", thực hiện xóa
    if (roomToDelete === roomId) {
      const updatedRoomList = roomList.filter((room) => room.id !== roomId);
      setRoomList(updatedRoomList);
      setRoomToDelete(null); // Đặt lại trạng thái "đang xóa" sau khi xóa
    } else {
      // Nếu phòng không trong trạng thái "đang xóa", đặt nó thành "đang xóa"
      setRoomToDelete(roomId);
    }
  };

  const totalPrice = roomList.reduce((total, room) => total + room.price, 0);

  const roomListDropdown = (
    <Menu className="w-[500px] h-[300px]">
      <h1 className="font-semibold text-lg mb-4 ml-3 mt-5">Phòng mới thêm:</h1>
      {roomList.map((room, index) => (
        <Menu.Item key={room.id} className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={room.image}
                alt={`Hình ảnh ${room.nameRoom}`}
                className="w-12 h-12 mr-4"
              />
              <span className="font-semibold">
                {index + 1}. {room.nameRoom}
              </span>
            </div>
            <span className="font-semibold">{room.nameHotel}</span>
            <div className="flex items-center">
              <span className="text-red-500">{room.price} Vnđ</span>
            </div>
            {roomToDelete === room.id ? (
              // Hiển thị nút xác nhận xóa và nút hủy bỏ
              <div className="flex items-center">
                <button
                  onClick={() => handleRemoveRoom(room.id)}
                  className="text-red-500 hover:underline mr-5 "
                >
                  <AiFillDelete size={18} />
                </button>
                <button
                  onClick={() => setRoomToDelete(null)}
                  className="text-gray-600 hover:text-gray-800 hover:underline"
                >
                  Hủy bỏ
                </button>
              </div>
            ) : (
              // Hiển thị nút xóa
              <button
                onClick={() => handleRemoveRoom(room.id)}
                className="text-red-500 hover:underline"
              >
                <AiFillDelete size={18} />
              </button>
            )}
          </div>
        </Menu.Item>
      ))}
      <div className="mt-4 flex justify-center items-center">
        <p className="mr-4">Tổng tiền: {totalPrice} Vnđ</p>
      </div>
    </Menu>
  );

  return (
    <div>
      <div
        onMouseEnter={() => setIsCartHovered(true)}
        onMouseLeave={() => setIsCartHovered(false)}
        className="relative"
      >
        <Dropdown overlay={roomListDropdown} visible={isCartHovered}>
          <AiOutlineShoppingCart size={30} />
        </Dropdown>
        {selectedRoomCount > 0 && (
          <div
            className="absolute top-0 left-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs ml-4"
            style={{ fontSize: "8px", paddingLeft: "2px",}}
          >
            {selectedRoomCount}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
