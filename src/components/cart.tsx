import React, { useState } from "react";
import { AiOutlineShoppingCart, AiFillDelete } from "react-icons/ai";
import { Dropdown, Menu, Modal } from "antd";

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
    // Thêm các phần tử khác của giỏ hàng ở đây
  ]);

  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
  const [roomToDelete, setRoomToDelete] = useState<any>(null);
  const [isCartHovered, setIsCartHovered] = useState(false); // Sử dụng để kiểm tra khi di chuột vào biểu tượng giỏ hàng

  const handleRemoveRoom = (roomId: any) => {
    setRoomToDelete(roomId);
    setDeleteConfirmationVisible(true);
  };

  const confirmDelete = () => {
    const updatedRoomList = roomList.filter((room) => room.id !== roomToDelete);
    setRoomList(updatedRoomList);
    setDeleteConfirmationVisible(false);
  };

  const cancelDelete = () => {
    setRoomToDelete(null);
    setDeleteConfirmationVisible(false);
  };

  const selectedRoomCount = roomList.length;
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
            <button
              onClick={() => handleRemoveRoom(room.id)}
              className="text-red-500"
            >
              <AiFillDelete />
            </button>
          </div>
        </Menu.Item>
      ))}
      <div className="mt-4 flex justify-center items-center">
        <p className="mr-4">Số phòng đã chọn: {selectedRoomCount}</p>
        <p>Tổng tiền: {totalPrice} Vnđ</p>
      </div>
    </Menu>
  );

  return (
    <div>
      <div
        onMouseEnter={() => setIsCartHovered(true)}
        onMouseLeave={() => setIsCartHovered(false)}
      >
        <Dropdown overlay={roomListDropdown} visible={isCartHovered}>
          <AiOutlineShoppingCart size={22} />
        </Dropdown>
      </div>

      <Modal
        title="Xác nhận xóa phòng"
        visible={deleteConfirmationVisible}
        onOk={confirmDelete}
        onCancel={cancelDelete}
        destroyOnClose
      >
        <p>Bạn có chắc chắn muốn xóa phòng này không?</p>
      </Modal>
    </div>
  );
};

export default Cart;
