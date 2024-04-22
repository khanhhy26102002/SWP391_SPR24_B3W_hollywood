import React from 'react'
import "./FURule.css";
import { Header } from './Header';
import { Footer } from './Footer';
export default function FURules() {
  return (
    <>
    <Header/>
        <div className='main-content' style={{backgroundColor: "white"}}>
       <section class="blog-details spad">
          <div className='container'>
             <div className='row d-flex justify-content-center'>
              <div className='col-lg-8' style={{color:"#000", textAlign:"left"}}>
                <div className='blog_details_item_text'>
                <h4>I. NỘI QUY PHÒNG CHIẾU</h4>
                <h5>1. Các quy định cơ bản:</h5>
                <p>
                <p class="indent">- Không quay phim hoặc chụp ảnh trong phòng chiếu.<br/></p>
                <p class="indent">- Tắt điện thoại hoặc đặt chế độ im lặng.</p>
                <p class="indent">- Cấm hút thuốc và sử dụng các chất kích thích.</p>
                <p class="indent">- Giữ gìn trật tự và không gây ồn ào.</p>
                <p class="indent">- Không nhai kẹo cao su hoặc mang thú cưng vào rạp.</p>
                <p class="indent">- Bảo quản tài sản cá nhân cẩn thận.</p>
                <h5>2. Quy định về thức ăn và đồ uống:</h5>
                </p>
                <p class="indent">- Chỉ được mang thức ăn và đồ uống mua tại quầy của FPTU Cinemas vào phòng chiếu.<br/></p>
                <h5>3. Quy định về độ tuổi:</h5>
                <p class="indent">- Khách dưới 13 tuổi không được phục vụ sau 22:00.<br/></p>
                <p class="indent">- Khách dưới 16 tuổi không được phục vụ sau 23:00.</p>
                <h5>4. Quyền của Ban Quản Lý:</h5>
                <p class="indent">- Ban Quản Lý có quyền từ chối phục vụ khách vi phạm các quy định.<br/></p>
                </div>
                <div className='blog_details_item_text'>
                <h4>II. PHÂN LOẠI PHIM THEO ĐỘ TUỔI</h4>
                <h5>1. Phân loại:</h5>
                <p> <p class="indent">- P: Phổ biến đến mọi độ tuổi.<br/></p>
                <p class="indent">- K: Dành cho khán giả dưới 13 tuổi, có người bảo hộ.</p>
                <p class="indent">- T13: Dành cho khán giả từ 13 tuổi trở lên.</p>
                <p class="indent">- T16: Dành cho khán giả từ 16 tuổi trở lên.</p>
                <p class="indent">- T18: Dành cho khán giả từ 18 tuổi trở lên.</p>
                <p class="indent">- C: Không được phép phổ biến.</p>
                <h5>2. Lưu ý:</h5>
                </p>
                <p class="indent">- Khách hàng cần xuất trình giấy tờ tùy thân để xác định độ tuổi.<br/></p>
                </div>
                <div className='blog_details_item_text'>
                <h4>III. QUY ĐỊNH VỀ KHUNG GIỜ CHIẾU PHIM CHO TRẺ EM</h4>
                <h5>1. Giới hạn giờ chiếu:</h5>
                 <p><p class="indent">- Trẻ em dưới 13 tuổi: Kết thúc trước 22:00.<br/></p>
                 <p class="indent">- Trẻ em dưới 16 tuổi: Kết thúc trước 23:00.</p>
                 <h5>2. Xác minh độ tuổi:</h5>
                 <p><p class="indent">- Yêu cầu khách hàng xuất trình giấy tờ tùy thân để xác định độ tuổi</p></p>
                 </p>
                </div>
                <div className='blog_details_item_text'>
                <h4>IV. CHÍNH SÁCH GIÁ VÉ ĐỐI VỚI QUÝ KHÁCH HÀNG</h4>
                <h5>1.Định nghĩa</h5>
                <p>
                <p class="indent">- Quy định giá vé cho các nhóm khách hàng khác nhau, bao gồm trẻ em, người cao tuổi, người khuyết tật, v.v.<br/></p>
                </p>
                <h5>2.Tài liệu xác minh</h5>
                <p><p class="indent">- Yêu cầu khách hàng xuất trình giấy tờ tùy thân để xác minh đối tượng khách hàng.</p></p>
                <h5>2.Chính sách giá vé</h5>
                <div>
                <p class="indent">- Giá vé được điều chỉnh tùy theo đối tượng khách hàng.</p>
                </div>
                </div>
              </div>
             </div>
          </div>
        </section>
    </div>
    <Footer/>
    </>
  )
}
