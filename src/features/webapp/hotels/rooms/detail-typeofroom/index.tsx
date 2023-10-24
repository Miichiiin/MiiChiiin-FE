import { AiOutlineHeart, AiOutlineClose, AiOutlineInfoCircle } from 'react-icons/ai'
import { BsPeople, BsChevronCompactRight, BsChevronCompactLeft } from 'react-icons/bs'
import { MdOutlineBed } from 'react-icons/md'
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useNavigate, useParams } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
// import type { DatePickerProps, RadioChangeEvent } from 'antd';
import { DatePicker,  message } from 'antd';
import { useGetCategory_homeByIdQuery } from '@/api/webapp/category_home';
import { useGetHotel_homeByIdQuery } from '@/api/webapp/hotel_home';
import { useAddRate_homeMutation } from '@/api/webapp/comment_home';
import { useGetRating_homeQuery } from '@/api/webapp/rates_home';

const { RangePicker } = DatePicker;

const images = [
  'https://booking-static.vinpearl.com/room_types/d76f7196be2e4dc48052b4216cf5d3b6_3630-024.jpg',
  'https://booking-static.vinpearl.com/room_types/3b32d17cdfd144e395addd747f481a6f_3630-004.jpg',
  'https://booking-static.vinpearl.com/room_types/cd1aa854eb3f4a65aa2087cca3e30ce6_3630-008.jpg',
  'https://booking-static.vinpearl.com/room_types/58dbe43d1302477fbaf0c10782bcca91_3630-039.jpg',
];

const DetailTypeofRoom = () => {
  const [roomRating, setRoomRating] = useState(0);// đánh giá
  const { idHotel, idRoom } = useParams()
  const {data:hotelData} = useGetHotel_homeByIdQuery(idHotel);
  const { data } = useGetCategory_homeByIdQuery(idRoom);
  // const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const [addRate] = useAddRate_homeMutation();
  const dataLogin = localStorage.getItem("user");
  const isLoggedIn = !!dataLogin;// kiểm tra login
  const dataToken = localStorage.getItem("token");    
  const {data:dataRate} = useGetRating_homeQuery(idRoom);
  const dataComment = dataRate?.filter((comment:any) => comment.id_category === parseInt(String(idRoom)));

    // Check xem có token chưa
    const [commentText, setCommentText] = useState("");
    const canComment = !!dataToken

    // Danh sách từ không thích hợp
    const inappropriateWords = ["mẹ", "rác rưởi", "súc vật", "ngu","cứt","buồi","cặc","dái","óc chó"]; 

    // Hàm kiểm tra từ không thích hợp
    const containsInappropriateWords = (text:any) => {
      const regex = new RegExp(`\\b(${inappropriateWords.join("|")})\\b`, "gi");
      return regex.test(text);
    };
    // thêm bình luận
    const handleCommentSubmit = async (e: any) => {
      e.preventDefault();
    
      if (canComment) {
        const hasInappropriateWords = containsInappropriateWords(commentText);
    
        if (hasInappropriateWords) {
          message.error('Bình luận của bạn chứa từ không thích hợp.');
        } else {
          if (dataLogin !== null) { // Kiểm tra xem dataLogin không phải null
            const userData = JSON.parse(dataLogin);
            
            
            try {
              const response = await addRate({
                  id_user: userData.id, // Sử dụng id từ userData
                  id_category: idRoom,
                  rating: roomRating,
                  content: commentText,
                  status: 0 // Tùy thuộc vào cách bạn quản lý trạng thái
              });
    
              if (response.data) {
                message.success('Bình luận đã được thêm thành công.');
                setCommentText('');
                setRoomRating(0);
              } else {
                message.error('Đã xảy ra lỗi khi thêm bình luận.');
              }
            } catch (error) {
              console.error('Error adding comment:', error);
              message.error('Đã xảy ra lỗi khi thêm bình luận.');
            }
          } else {
            message.error('Dữ liệu người dùng không tồn tại. Vui lòng đăng nhập để bình luận.');
            navigate("/login");
          }
        }
      } else {
        message.error('Vui lòng đăng nhập để bình luận.');
        navigate("/login");
      }
    };
  //
  const [selectedRange, setSelectedRange] = useState<[Date | null, Date | null]>([null, null]);

  const handleRangeChange = (dates: any) => {
    setSelectedRange([dates[0]?.toDate() || null, dates[1]?.toDate() || null]);
  };

  const handleButtonClick = () => {
    if (selectedRange[0] && selectedRange[1]) {
      console.log('Ngày bắt đầu:', selectedRange[0].toISOString().slice(0, 10));
      console.log('Ngày kết thúc:', selectedRange[1].toISOString().slice(0, 10));
      message.success('Chọn ngày thành công');
    } else {
      message.error('Vui lòng chọn một khoảng ngày.');
    }
  };

  const saveRoomInfoToLocalStorage = (name:any, price:any,hotel_id:any,id:any) => {
    const roomInfo = { hotel_id,id,name, price };
    localStorage.setItem('roomInfo', JSON.stringify(roomInfo));
  };


  interface Room {
    count: number;
    name: string;
    price: number;
  }

  const onHandSubmit = () => {
    if (selectedRange[0] && selectedRange[1]) {
      const updatedSelectedRooms = [{
        count: 1,
        name: data?.name,
        price: data?.price
      }];
      const numberOfRooms1 = [`adults:1,children:0,infants:0`];
      const encodedSelectedRooms = 1
      
      const hotel = `${data.hotel_id}, ${hotelData?.name}`
      
      const url = `/choose-room/${hotel}/${selectedRange}/${encodedSelectedRooms}/${numberOfRooms1}`;
     
      console.log("url", url);

      saveRoomInfoToLocalStorage(data.name, data.price,data.id,data.hotel_id);
  
      navigate(url);
    } else {
      message.error('Vui lòng chọn ngày check-in và check-out trước khi đặt phòng.');
    }
  };

  // State để bật tắt modal và lưu index của ảnh hiện tại
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Bật modal
  const toggleModal = () => {
    setShowModal(!showModal);
    setCurrentImageIndex(0);
  };
  // Trở về ảnh trước
  const showPreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else {
      setCurrentImageIndex(images.length - 1);
    }
  };
  // Sang ảnh tiếp theo
  const showNextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      setCurrentImageIndex(0);
    }
  };
  useEffect(() => {
    let timer:any;

    if (showModal) {
      // Tạo một hàm để chuyển đổi ảnh tiếp theo
      const showNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      };

      // Thiết lập một interval để tự động chuyển đổi ảnh sau mỗi 2 giây
      timer = setInterval(showNextImage, 2000);
    } else {
      clearInterval(timer); // Xóa interval khi Modal không hiển thị
    }

    return () => {
      clearInterval(timer); // Đảm bảo xóa interval khi component unmounts
    };
  }, [showModal, images]);


  return (
    <div className='max-w-7xl mx-auto my-5'>
      <div className="flex justify-between pb-5">
        <h1 className=' uppercase'><span className='text-2xl font-bold text-blue-900 italic'>{hotelData?.name}</span> - <span className='text-lg font-semibold'>{data?.name}</span></h1>
        <button className='flex items-center text-red-500 font-semibold hover:text-red-700'><AiOutlineHeart className='mx-2' /> Yêu thích</button>
      </div>
      <div className='grid grid-cols-5 gap-8'>
        <div className='col-span-4'>
          <img src="https://booking-static.vinpearl.com/room_types/d76f7196be2e4dc48052b4216cf5d3b6_3630-024.jpg" alt="" className='w-full rounded' />
        </div>
        <div className='col-span-1'>
          <div className='pb-6'>
            <img src="https://booking-static.vinpearl.com/room_types/3b32d17cdfd144e395addd747f481a6f_3630-004.jpg" alt="" className='w-full rounded' />
          </div>
          <div className='pb-6'>
            <img src="https://booking-static.vinpearl.com/room_types/cd1aa854eb3f4a65aa2087cca3e30ce6_3630-008.jpg" alt="" className='w-full rounded' />
          </div>
          <div className='pb-6'>
            <img src="https://booking-static.vinpearl.com/room_types/58dbe43d1302477fbaf0c10782bcca91_3630-039.jpg" alt="" className='w-full rounded' />
          </div>
          <div className=''>
            <img src="https://booking-static.vinpearl.com/room_types/d76f7196be2e4dc48052b4216cf5d3b6_3630-024.jpg" alt="" className='w-full rounded cursor-pointer'
             onClick={toggleModal}/>
            
          </div>
          {/*  */}
        </div>
        {/* Cửa sổ popup */}
        <Modal
          isOpen={showModal}
          onRequestClose={toggleModal}
          contentLabel="Additional Images"
          className="modal mx-auto mt-[100px] animate-fade-in "
        >
          <div className='max-w-3xl mx-auto'>
            <button
              className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
              onClick={toggleModal}
            >
              <AiOutlineClose className='text-2xl' />
            </button>
            <div className='relative'>
              <img src={images[currentImageIndex]} alt="" className='w-full rounded ' />
              <div className='absolute inset-0 flex justify-between items-center'>
                <button
                  className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded'
                  onClick={showPreviousImage}
                >
                  <BsChevronCompactLeft />
                </button>
                <button
                  className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded'
                  onClick={showNextImage}
                >
                  <BsChevronCompactRight />
                </button>
              </div>
            </div>
          </div>
        </Modal>

      </div>
      <div className='pb-5'>
        <div className='flex space-x-3 items-center'>
          <h1 className='text-xl font-semibold pb-4'>Giá: </h1>
          <h1 className='text-red-500 text-xl font-semibold pb-4'>{data?.price} VND</h1>
        </div>
        <div className='flex items-center space-x-8'>
          <RangePicker onChange={handleRangeChange} />
          <button
            className="bg-blue-500 hover:bg-blue-700 border-none text-white py-1 px-2 rounded my-2"
            onClick={handleButtonClick}>
            Chọn ngày
          </button>
        </div>
        <div className='flex space-x-1 my-3'>
          <FaUser /><FaUser /><FaUser /><FaUser /><FaUser />
        </div>
      </div>
      <div className='pb-5'>
        <h1 className='text-xl font-semibold pb-4'>Bạn cảm thấy ưng ý chưa ?</h1>
        <div className=' flex justify-end space-x-8 '>
          <button onClick={onHandSubmit} className='bg-blue-500 hover:bg-blue-700 text-white py-4 px-2 rounded my-2'>Đặt phòng ngay</button>
          <Link to={`/hotel/${idHotel}`} className='bg-red-300 hover:bg-red-700 py-4 text-white  px-2 rounded  my-2'>Quay lại</Link>
        </div>
      </div>
      <div className='py-5'>
        <h1 className='text-xl font-semibold pb-2'>{data?.name}</h1>
        <p className='text-md pb-2'>{data?.description}</p>
        <h1 className='text-xl font-semibold pb-2'>Tiện nghi</h1>
        <div className='grid grid-cols-5 gap-2 pb-2'>
          <h1 className='flex items-center text-md'><BsPeople /><span className='px-2'>8 người</span></h1>
          <h1 className='flex items-center text-md'><MdOutlineBed /><span className='px-2'>Giường lớn</span></h1>
          <h1 className='flex items-center text-md'><BsPeople /><span className='px-2'>8 người</span></h1>
          <h1 className='flex items-center text-md'><MdOutlineBed /><span className='px-2'>Giường lớn</span></h1>
          <h1 className='flex items-center text-md'><BsPeople /><span className='px-2'>8 người</span></h1>
          <h1 className='flex items-center text-md'><MdOutlineBed /><span className='px-2'>Giường lớn</span></h1>
        </div>
        <div className='pb-2'>
          <h1 className='text-xl font-semibold pb-4'>Đánh giá</h1>
          {/* Show ra đánh giá */}
          <div className='comment-list grid grid-cols-2 gap-4 pb-5'>
              {dataComment?.map((item: any) => {
                const createdAtDate = new Date(item.created_at);
                const formattedDate = createdAtDate.toLocaleDateString('vi-VN');
                const firstLetterOfName = item.user_name.charAt(0);
                  return (
                    <div key={item.id} className='comment column'>
                    <div className='comment column'>
                        <div className="small-column py-2 flex items-center">
                          <div className="border rounded-full bg-blue-300 w-16 h-16 flex justify-center items-center">
                            <span className="text-xl font-bold">{firstLetterOfName}</span>
                          </div>
                          <h1 className="text-[17px] px-3">{formattedDate}
                            <br />
                            <span className="font-bold ">{item.user_name}</span>
                          </h1>
                          <h1 className="text-[17px] ml-5 mb-[-5px]"><span className='font-semibold italic'>{data?.name}</span>
                          <h1 className='text-yellow-400 text-[20px]  mt-[-5px]'>{'★'.repeat(item.rating)}</h1>
                          </h1>
                        </div>
                        <h1 className='ml-[75px]'>{item.content}</h1>
                      </div>
                    </div>
                  );
                })}
                
            </div>

          {/*Form đánh giá */}
          <div className="flex items-center justify-start shadow-lg mb-4 w-full">
            <form onSubmit={handleCommentSubmit} className="bg-white rounded-lg pt-2 w-full">
              <div className="flex flex-wrap mx-3 mb-6">
                <div className="flex items-center justify-between">
                  <div className=''>
                    <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg font-semibold">Thêm đánh giá mới</h2>
                  </div>
                  <div className="flex items-center space-x-2 mt-1 ml-[800px]">
                      <p className="text-lg font-semibold">Đánh giá sao :</p>
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <label key={rating} className="cursor-pointer">
                          <input
                            type="radio"
                            name="roomRating"
                            value={rating.toString()}
                            onChange={(e) => setRoomRating(Number(e.target.value))}
                            className="hidden"
                          />
                          <span className={`text-2xl ${roomRating >= rating ? 'text-yellow-400' : 'text-gray-400'}`}>&#9733;</span>
                        </label>
                      ))}
                    </div>
                </div>
                {isLoggedIn && (
                    <div className="w-full md:w-full flex items-start px-3 mb-2">
                      <textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 placeholder-gray-700 focus:outline-none focus-bg-white"
                        name="body"
                        placeholder="Viết một đánh giá mới"
                        required
                      ></textarea>
                    </div>
                  )}
                  {!isLoggedIn && (
                    <div className="w-full md:w-full flex items-start px-3 mb-2">
                      <textarea
                        className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 placeholder-gray-700 focus:outline-none focus-bg-white"
                        name="body"
                        placeholder="Đăng nhập để bình luận"
                        disabled
                      ></textarea>
                    </div>
                  )}
                <div className="w-full md:w-full flex items-start px-3">
                  <div className="flex items-center text-gray-700 mr-auto">
                    <AiOutlineInfoCircle />
                    <p className="text-xs md:text-sm pt-px px-2">Hãy đánh giá lịch sự.</p>
                  </div>
             
                  <div className="flex justify-end">
                    {isLoggedIn ? (
                        <button
                          onClick={onHandSubmit}
                          className="text-blue-700 font-semibold py-2 px-4 border border-blue-400 rounded-lg tracking-wide hover:bg-blue-500 hover:text-white text-lg"
                        >
                          Đăng bình luận
                        </button>
                      ) : (
                        <Link to="/login" className="text-blue-700 font-semibold py-2 px-4 border border-blue-400 rounded-lg tracking-wide hover:bg-blue-500 hover:text-white text-lg">
                          Đăng nhập
                        </Link>
                      )}
                  </div>
                 
                </div>
                
              </div>
            </form>

        </div>

        </div>
      </div>
    </div>
  )
}

export default DetailTypeofRoom