create database Movie_Booking_Ticket;
use Movie_Booking_Ticket;

CREATE TABLE Role(
    role_id INT PRIMARY KEY,
    role_name VARCHAR(255)
);

CREATE TABLE User(
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    avatar VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    gender VARCHAR(255),
    birthdate DATE,
    phone VARCHAR(255),
    role_id INT,
    token VARCHAR(255),
    FOREIGN KEY (role_id) REFERENCES Role(role_id)
);

CREATE TABLE Movie (
    movie_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    duration TIME NOT NULL,
    director VARCHAR(255) NOT NULL,
    actor VARCHAR(255) NOT NULL,
    genre VARCHAR(50) NOT NULL,
    premiere DATE NOT NULL,
    language VARCHAR(50) NOT NULL,
    rated VARCHAR(10),
    trailer VARCHAR(255),
    user_id INT,
    created_date DATETIME NOT NULL,
    updated_date DATETIME,
    status INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE Image (
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    movie_id INT,
    image_name VARCHAR(255) NOT NULL,
    path VARCHAR(255) NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES Movie(movie_id)
);

CREATE TABLE Room (
    room_id INT AUTO_INCREMENT PRIMARY KEY,
    room_number VARCHAR(10) NOT NULL,
    number_of_seat INT NOT NULL,
    status INT NOT NULL
);

CREATE TABLE Screening (
    screening_id INT AUTO_INCREMENT PRIMARY KEY,
    movie_id INT,
    user_id INT,
    room_id INT,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    date DATE NOT NULL,
    status INT NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES Movie(movie_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (room_id) REFERENCES Room(room_id)
);

CREATE TABLE Ticket (
    ticket_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    screening_id INT,
    total_price DECIMAL(10,2),
    created_date DATETIME NOT NULL,
    updated_date DATETIME,
    expiration_time DATETIME NOT NULL,
    qr_code VARCHAR(255),
    status INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (screening_id) REFERENCES Screening(screening_id)
);

CREATE TABLE Seat (
    seat_id INT AUTO_INCREMENT PRIMARY KEY,
    room_id INT,
    seat_number VARCHAR(10) NOT NULL,
    seat_type VARCHAR(50) NOT NULL,
    seat_price DECIMAL(10,2) NOT NULL,
    status INT NOT NULL,
    seat_row VARCHAR(10) NOT NULL,
    FOREIGN KEY (room_id) REFERENCES Room(room_id)
);

CREATE TABLE Booking_seat (
    booking_seat_id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_id INT,
    seat_id INT,
    total DECIMAL(10,2),
    FOREIGN KEY (ticket_id) REFERENCES Ticket(ticket_id),
    FOREIGN KEY (seat_id) REFERENCES Seat(seat_id)
);

CREATE TABLE Combo (
    combo_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    combo_name VARCHAR(255) NOT NULL,
    description TEXT,
    combo_price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE Booking_combo (
    booking_combo_id INT AUTO_INCREMENT PRIMARY KEY,
    combo_id INT,
    ticket_id INT,
    quantity INT NOT NULL,
    total_amount DECIMAL(10,2),
    FOREIGN KEY (combo_id) REFERENCES Combo(combo_id),
    FOREIGN KEY (ticket_id) REFERENCES Ticket(ticket_id)
);

CREATE TABLE Payment (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_id INT,
    payment_method VARCHAR(50) NOT NULL,
    payment_date DATETIME NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    status INT NOT NULL,
    FOREIGN KEY (ticket_id) REFERENCES Ticket(ticket_id)
);

INSERT INTO Role (role_id, role_name)
VALUES 
(1, 'ADMIN'),
(2, 'MEMBER'),
(3, 'STAFF');

INSERT INTO User (user_name, avatar, email, password, address, gender, birthdate, phone, role_id)
VALUES 
('John Doe', 'avatar1.jpg', 'john.doe@email.com', '$2a$12$2FLYwv5UHHmWudz9zDwZEOfmQJ/b2eckhMRMybt8/Mps/PvLp7KY2', '123 Main St', 'Male', '1990-01-15', '123456789', 1),
('Jane Doe', 'avatar2.jpg', 'jane.doe@email.com', '$2a$12$d1PQoKPkXANilkQkct9v5O0hTtbw..bh8/71.JZhA4inolgAwPnuW', '456 Elm St', 'Female', '1995-05-20', '987654321', 2),
('Alice Smith', 'avatar3.jpg', 'alice@email.com', '$2a$12$EYL8X7kk91NfJXpA0yhiXO6q/IBs1lh/DlZ5BsSxA6ESAE4MUysJ2', '789 Oak St', 'Female', '1985-10-10', '111222333', 2),
('Bob Johnson', 'avatar4.jpg', 'bob@email.com', '$2a$12$/dZhlae7AVMbOCaOTlXRoeWWJJRgwsrmNQLB4Me2ZW3u5Gbmd8brW', '101 Pine St', 'Male', '1988-12-25', '444555666', 3),
('Eve Williams', 'avatar5.jpg', 'eve@email.com', '$2a$12$GYculVlazTsLQ8bsyeiU..9tWAZyzPHDEQiN9mkUbhf5AFcTlCHyG', '202 Maple St', 'Female', '1992-03-08', '777888999', 3);

INSERT INTO Movie (name, description, duration, director, actor, genre, premiere, language, rated, trailer, user_id, created_date, updated_date, status)
VALUES 
('GODZILLA X KONG: ĐẾ CHẾ MỚI', 'Kong và Godzilla - hai sinh vật vĩ đại huyền thoại, hai kẻ thủ truyền kiếp sẽ cùng bắt tay thực thi một sứ mệnh chung mang tính sống còn để bảo vệ nhân loại, và trận chiến gắn kết chúng với loài người mãi mãi sẽ bắt đầu.', '02:30:00', ' Adam Wingard', 'Rebecca Hall, Brian Tyree Henry,Stevens', 'Hành Động, Phiêu Lưu', '2024-01-01', 'English', 'K', 'https://www.youtube.com/watch?v=B2Jlyq_Tf3Y', 1, NOW(), NOW(), 1),
('B4S – TRƯỚC GIỜ “YÊU”', 'B4S - Trước Giờ "Yêu" sẽ bắt đầu bằng một đêm “nhớ đời” của hai nhóm bạn thân tại quán bar.', '02:00:00', 'Tùng Leo', 'Jun Vũ, Khánh Vân,Khazsak', 'Hài, Tình cảm', '2024-02-15', 'English', 'T18', 'https://www.youtube.com/watch?v=JJ_SyVWN9g0', 2, NOW(), NOW(), 1),
('CÁI GIÁ CỦA HẠNH PHÚC', 'Bà Dương và ông Thoại luôn cố gắng để xây dựng một hình ảnh gia đình tài giỏi và danh giá trong mắt mọi người. Tuy nhiên dưới lớp vỏ bọc hào nhoáng ấy là những biến cố và lục đục gia đình đầy sóng gió.', '01:45:00', 'Nguyễn Ngọc Lâm', 'Xuân Lan, Thái Hoà, Lâm Thanh Nhã', ' Tâm Lý', '2024-03-10', ' Tiếng Việt ', 'T18', 'https://www.youtube.com/watch?v=79BznZKQwIQ', 3, NOW(), NOW(), 1),
('MÙA HÈ CỦA LUCA', '"Mùa Hè Của Luca" kể về chuyến hành trình của cậu bé Luca tại hòn đảo Portorosso thuộc vùng biển Địa Trung Hải ở Ý tuyệt đẹp', '02:20:00', 'Enrico Casarosa', 'Jacob Tremblay, Dylan Grazer, Emma Berman ', 'Hài, Hoạt Hình, Phiêu Lưu', '2024-04-05', 'English', 'P', 'https://www.youtube.com/watch?v=FzV3gRevq4Q', 4, NOW(), NOW(), 1),
('KUNG FU PANDA 4', 'Sau khi Po được chọn trở thành Thủ lĩnh tinh thần của Thung lũng Bình Yên,', '01:50:00', 'Mike Mitchell', 'Jack Black,Dustin Hoffman,James Hong', 'Hài, Hoạt Hình', '2024-05-20', 'English', 'P', 'https://www.youtube.com/watch?v=_inKs4eeHiI', 5, NOW(), NOW(), 1),
('TU VIỆN MÁU', 'Với đức tin sâu sắc, Cecilia đến với một tu viện cổ kính, nằm giữa một vùng quê đẹp nên thơ tại nước Ý trong sự chào đón của mọi người. ', '02:00:00', 'Michael Mohan', 'Sydney Sweeney, Álvaro Morte, Simona Tabasco', 'Kinh Dị', '2024-05-26', 'English', 'T18', 'https://www.youtube.com/watch?v=5ff3iUauZko', 1, NOW(), NOW(), 1),
('YÊU CUỒNG LOẠN', 'Cuộc tình mới chớm nở giữa nữ quản lý phòng tập Lou (Kristen Stewart) và vận động viên thể hình đầy tham vọng Jackie (Katy O’Brian) ', '01:50:00', 'Rose Glass', 'Kristen Stewart, Ed Harris', 'Hồi hộp, Tình cảm', '2024-05-20', 'English', 'T18', 'https://www.youtube.com/watch?v=Td37l9iYL2k', 2, NOW(), NOW(), 1),
('ANH HÙNG BÀN PHÍM', 'Im Sang-jin - một phóng viên mảng xã hội đã bị đình chỉ công tác sau bài phóng sự điều tra sai lệch về những lùm xùm của tập đoàn Manjun.', '02:50:00', 'Ahn Guk Jin', ' Son Sukku, Kim Sung-Cheol,Kim Dong-Hwi', 'Romance', '2024-05-27', 'English', 'T16', 'https://www.youtube.com/watch?v=fX0pDW1PD94', 2, NOW(), NOW(), 1),
('THANH XUÂN 18x2: LỮ TRÌNH HƯỚNG VỀ EM', 'Ký ức tình đầu ùa về khi Jimmy nhận được tấm bưu thiếp từ Ami. Cậu quyết định một mình bước lên chuyến tàu đến Nhật Bản gặp lại người con gái cậu đã bỏ lỡ 18 năm trước.', '01:50:00', ' Fujii Michihito', 'Greg Hsu, Kaya Kiyohara, Chang Chen', 'Tình cảm', '2024-05-25', 'English', 'T13', 'https://www.youtube.com/watch?v=M7ylLPdaVvU', 4, NOW(), NOW(), 1),
('BIỆT ĐỘI SĂN MA: KỶ NGUYÊN BĂNG GIÁ', 'Sau các sự kiện của Ghostbusters: Afterlife, gia đình Spengler đang tìm kiếm cuộc sống mới ở Thành phố New York', '01:50:00', 'Gil Kenan', 'Mckenna Grace, Carrie Coon,Annie Potts ', ' Hài, Phiêu Lưu, Thần thoại', '2024-05-20', 'English', 'T18', 'https://www.youtube.com/watch?v=Y4Fbcvq-9RU', 5, NOW(), NOW(), 1),
('NGÀY TÀN CỦA ĐẾ QUỐC', 'Trong một tương lai gần, một nhóm các phóng viên chiến trường quả cảm phải đấu tranh với thời gian và bom đạn nguy hiểm để đến kịp Nhà Trắng giữa bối cảnh nội chiến Hoa Kỳ đang tiến đến cao trào', '01:50:00', 'Alex Garland', 'Kirsten Dunst, Wagner Moura, Cailee Spaeny', 'Hành Động, Khoa Học Viễn Tưởng', '2024-05-25', 'English', 'T18', 'https://www.youtube.com/watch?v=QGlgPf9jGMA', 1, NOW(), NOW(), 1),
('HÀO QUANG ĐẪM MÁU', 'Câu chuyện kể về Lee Soo-yeon (do Ji-yeon thủ vai) - một nữ minh tinh màn bạc đang ở đỉnh cao sự nghiệp nhưng bất chợt tuột dốc không phanh vì tai nạn chết người', '02:30:00', 'Yoo Young-su', 'Park Ji Yeon, Song Ji Eun,Kim Nu Ri ', ' Hồi hộp', '2024-05-25', 'English', 'K', 'https://www.youtube.com/watch?v=DkPEFmYvDT4', 5, NOW(), NOW(), 1),
('SUGA | Agust D TOUR ‘D-DAY’ THE MOVIE', 'Là chặng cuối của chuyến lưu diễn vòng quanh thế giới, SUGA | Agust D TOUR ‘D-DAY’ THE FINAL là đêm diễn chốt hạ của 25 buổi hòa nhạc được tổ chức tại 10 thành phố, thu hút tổng cộng 290.000 khán giả ', '01:50:00', 'JUNSOO PARK', 'SUGA (BTS)', 'Hòa nhạc', '2024-05-19', 'Tiếng Hàn', 'K', 'https://www.youtube.com/watch?v=DlHDpgi1Rdc', 1, NOW(), NOW(), 1),
('NGƯỜI "BẠN" TRONG TƯỞNG TƯỢNG', 'Khi Jessica (DeWanda Wise) chuyển về ngôi nhà thời thơ ấu cùng gia đình thì cô con gái riêng bé bỏng Alice (Pyper Braun) vô tình tìm thấy một chú gấu nhồi bông tên là Chauncey ở tầng hầm. ', '01:30:00', ' Jeff Wadlow', 'DeWanda Wise, Tom Payne,Taegan Burns, Pyper Braun, Veronica Falcon ', 'Kinh Dị', '2024-05-18', 'English', 'T13', 'https://www.youtube.com/watch?v=EORcSY3j0dI', 5, NOW(), NOW(), 1),
('MONKEY MAN BÁO THÙ', 'Một chàng trẻ vô danh, đã bắt đầu cuộc hành trình trả thù chống lại những kẻ lãnh đạo tham nhũng đã sát hại mẹ anh và đàn áp những người nghèo khổ và yếu thế hơn. ', '01:50:00', 'Dev Patel', 'Dev Patel,Sharlto Copley, Pitobash, Sobhita Dhulipala, Sikandar Kher', 'Hành Động, Kinh Dị', '2024-05-04', 'Tiếng Anh - Phụ đề Tiếng Việt', 'T18', 'https://www.youtube.com/watch?v=zEOXpArv940', 1, NOW(), NOW(), 1),
('ĐIỀM BÁO CỦA QUỶ', 'Khi một cô gái người Mỹ được đưa đến Rome để bắt đầu phụng sự Giáo Hội, cô đã phát hiện ra thế lực hắc ám khiến cô hoài nghi về đức tin của chính mình, đồng thời hé lộ một âm mưu kinh hoàng nhằm tái sinh linh hồn ác quỷ đầu thai đến nhân thế. ', '01:50:00', ' Arkasha Stevenson', 'Nell Tiger Free, Tawfeek Barhom, Sonia Braga, Ralph Ineson, and Bill Nighy', 'Kinh Dị', '2024-05-05', 'English', 'T18', 'https://www.youtube.com/watch?v=AVAnQaJ49l8', 5, NOW(), NOW(), 1);
INSERT INTO Image (movie_id, image_name, path)
VALUES 
(1, 'poster1.jpg', 'https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/190x260/2e2b8cd282892c71872b9e67d2cb5039/p/o/poster_payoff_godzilla_va_kong_3_1_.jpg'),
(2, 'poster2.jpg', 'https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/190x260/2e2b8cd282892c71872b9e67d2cb5039/4/7/470wx700h-b4s_3.jpg'),
(3, 'poster3.jpg', 'https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/190x260/2e2b8cd282892c71872b9e67d2cb5039/7/0/700x1000-cghp-min.jpg'),
(4,  'poster3.jpg','https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/190x260/2e2b8cd282892c71872b9e67d2cb5039/r/s/rsz_1200x1800_2.jpg'),
(5, 'poster5.jpg', 'https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/190x260/2e2b8cd282892c71872b9e67d2cb5039/4/7/470x700-kungfupanda4.jpg'),
(6, 'poster6.jpg', 'https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/190x260/2e2b8cd282892c71872b9e67d2cb5039/p/o/poster_tu_vien_mau_8.jpg'),
(7, 'poster7.jpg', 'https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/190x260/2e2b8cd282892c71872b9e67d2cb5039/4/7/470wx700h-llb.jpg'),
(8, 'poster8.jpg', 'https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/190x260/2e2b8cd282892c71872b9e67d2cb5039/t/f/tf_teaser-poster.jpg'),
(9, 'poster9.jpg', 'https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/190x260/2e2b8cd282892c71872b9e67d2cb5039/4/0/406x600-18x2.jpg'),
(10,'poster10.jpg', 'https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/190x260/2e2b8cd282892c71872b9e67d2cb5039/g/b/gbfe_intl_online_1080x1350_cubes_01.jpg'),
(11, 'poster11.jpg', 'https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/190x260/2e2b8cd282892c71872b9e67d2cb5039/4/7/470wx700h-civilwar.jpg'),
(12,'poster12.jpg', 'https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/190x260/2e2b8cd282892c71872b9e67d2cb5039/w/a/wannabe_-_main_poster.jpg'),
(13, 'poster13.jpg', 'https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/190x260/2e2b8cd282892c71872b9e67d2cb5039/s/u/suga_poster_700x1000.jpg'),
(14,'poster14.jpg', 'https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/190x260/2e2b8cd282892c71872b9e67d2cb5039/1/0/1080x1350-imaginary.jpg'),
(15, 'poster15.jpg', 'https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/190x260/2e2b8cd282892c71872b9e67d2cb5039/4/7/470x700_monkeyman.jpg'),
(16,'poster16.jpg', 'https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/190x260/2e2b8cd282892c71872b9e67d2cb5039/7/0/700x1000-omen.jpg');

INSERT INTO Room (room_number, number_of_seat, status)
VALUES 
('Room1', 100, 1),
('Room2', 80, 1),
('Room3', 120, 1),
('Room4', 90, 1),
('Room5', 110, 1);

INSERT INTO Screening (movie_id, user_id, room_id, start_time, end_time, date, status)
VALUES 
(1, 1, 1, '2024-05-01 15:00:00', '2024-05-01 17:30:00', '2024-05-01', 1),
(2, 2, 2, '2024-05-02 18:00:00', '2024-05-02 20:00:00', '2024-05-02', 1),
(3, 3, 3, '2024-05-03 19:00:00', '2024-05-03 21:00:00', '2024-05-03', 1),
(4, 4, 4, '2024-05-04 16:30:00', '2024-05-04 19:00:00', '2024-05-04', 1),
(5, 5, 5, '2024-05-05 14:00:00', '2024-05-05 16:00:00', '2024-05-05', 1);

INSERT INTO Ticket (user_id, screening_id, total_price, created_date, updated_date, expiration_time, qr_code, status)
VALUES 
(2, 1, 150.00, NOW(), NOW(), '2024-05-01 14:59:59', 'qr_code1', 1),
(3, 2, 120.00, NOW(), NOW(), '2024-05-02 17:59:59', 'qr_code2', 1),
(4, 3, 100.00, NOW(), NOW(), '2024-05-03 18:59:59', 'qr_code3', 1),
(5, 4, 140.00, NOW(), NOW(), '2024-05-04 15:59:59', 'qr_code4', 1),
(1, 5, 110.00, NOW(), NOW(), '2024-05-05 13:59:59', 'qr_code5', 1);

INSERT INTO Seat (room_id, seat_number, seat_type, seat_price, status, seat_row)
VALUES 
(1, 'A1', 'Standard', 10.00, 1, 'A'),
(1, 'A2', 'Standard', 10.00, 1, 'A'),
(2, 'B1', 'VIP', 15.00, 1, 'B'),
(2, 'B2', 'VIP', 15.00, 1, 'B'),
(3, 'C1', 'Standard', 10.00, 1, 'C');

INSERT INTO Booking_seat (ticket_id, seat_id, total)
VALUES 
(1, 1, 20.00),
(1, 2, 30.00),
(2, 3, 15.00),
(3, 4, 20.00),
(4, 5, 30.00);

INSERT INTO Combo (user_id, combo_name, description, combo_price)
VALUES 
(1, 'Combo1', 'Popcorn and Soda', 12.50),
(2, 'Combo2', 'Hotdog and Drink', 10.00),
(3, 'Combo3', 'Nachos and Soda', 8.00),
(4, 'Combo4', 'Popcorn and Beer', 15.00),
(5, 'Combo5', 'Candy and Juice', 7.50);

INSERT INTO Booking_combo (combo_id, ticket_id, quantity, total_amount)
VALUES 
(1, 1, 1, 12.50),
(2, 2, 2, 20.00),
(3, 3, 1, 8.00),
(4, 4, 1, 15.00),
(5, 5, 3, 22.50);

INSERT INTO Payment (ticket_id, payment_method, payment_date, amount, status)
VALUES 
(1, 'Credit Card', NOW(), 150.00, 1),
(2, 'PayPal', NOW(), 120.00, 1),
(3, 'Cash', NOW(), 100.00, 1),
(4, 'Debit Card', NOW(), 140.00, 1),
(5, 'Credit Card', NOW(), 110.00, 1);

