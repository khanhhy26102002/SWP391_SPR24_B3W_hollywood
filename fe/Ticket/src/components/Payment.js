import React, { useEffect, useState } from 'react';
import '../components/Payment.css';
import { useLocation } from 'react-router-dom';
import { fetchPaymentData } from '../api/paymentApi';
export default function Payment() {
  const location = useLocation();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (location.state > 0  ) {
      setTotal(location.state);
    }
  },[location.state]);

  // useEffect(() => {
  //   fetchPayment();
  // },[])

  // const fetchPayment = async () => {
  //   try {
  //     const res = await fetchPaymentData(22, sessionStorage.getItem("jwt"));
  //     setBill([...res.data]);
  //   } catch (error) {
  //     console.error("Error fetching posts:", error);
  //   }
  // }
  return (
    <>
      <div>
        {/* <div className="spinner" id="spinner" style={{display: 'none'}}>
    <div />
    <div />
    <div />
    <div />
  </div>
  <div id="page" style={{}}>
    <nav className="navbar navbar-default hidden-xs">
      <div className="container-fluid" style={{padding: 1, width: '45%', minWidth: 800}}>
        <div className="navbar-header" style={{position: 'relative'}}>
          <div className="col-xs-12 col-sm-12 col-md-12 text-right" style={{paddingRight: 0}}>
            <img src="/gw_payment/faces/javax.faces.resource/images/hotline.svg" alt="logo-security" width={35} />
            <span>1900 54 54 41</span>
            <img src="/gw_payment/faces/javax.faces.resource/images/email.svg" alt="logo-security" width={35} />
            <a href="mailto:hotro@momo.vn"><span>hotro@momo.vn</span></a>
          </div>
        </div>
      </div>
    </nav>
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-4 left hidden-xs">
          <div className="info-box">
            <div className="expiredAt" style={{position: 'relative', paddingBottom: 20, color: 'white'}}>
              <h3 style={{color: '#e8e8e8'}}>Đơn hàng hết hạn sau</h3>
              <span name="expiredAt" style={{fontSize: '1.7rem'}}>02:06</span>
            </div>
            <div className="receipt">
              Nhà cung cấp <br /><span style={{paddingLeft: 25}}>CGV</span>
            </div>
            <div className="entry">
              <p><i className="fa fa-money" aria-hidden="true" style={{}} />
                <span style={{paddingLeft: 5}}>Số tiền</span>
                <br />
                <span style={{paddingLeft: 25}}>318.000đ</span>
              </p>
            </div>
            <div className="entry">
              <p><i className="fa fa-credit-card" aria-hidden="true" style={{}} />
                <span style={{paddingLeft: 5}}>Thông tin</span>
                <br />
                <span style={{paddingLeft: 25, wordBreak: 'keep-all'}}>024-20240426030217-129004294</span>
              </p>
            </div>
            <div className="entry">
              <p><i className="fa fa-barcode" aria-hidden="true" style={{}} />
                <span style={{paddingLeft: 5}}>Đơn hàng</span>
                <br />
                <span style={{paddingLeft: 25, wordBreak: 'break-all'}}>129004294</span>
              </p>
            </div>
            <div className="entry" style={{width: '100%', textAlign: 'center', position: 'absolute', bottom: 0, left: 0}}>
              <a href="https://payment.momo.vn/gw_payment/m2?id=5e08147e1ce85b6e60a6cf394a9da8c15365b5c0" style={{color: '#e8e8e8', fontWeight: 200}}>
                <i className="fa fa-arrow-left" aria-hidden="true" style={{}} />
                <span>Quay lại</span></a>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-8 right">
          <div className="content">
            <div className="header">
              <a href="https://cdn.mservice.io/static/gcs_partner_m4b/24448-2019-05-31/saHon8l0idgsd6yjSXkb_1559293361228" style={{}}>
                <img className="lazy logo-image-size" data-original="https://cdn.mservice.io/static/gcs_partner_m4b/24448-2019-05-31/saHon8l0idgsd6yjSXkb_1559293361228" height="80px" style={{maxWidth: 200, display: 'inline'}} alt="logo-momo" src="https://cdn.mservice.io/static/gcs_partner_m4b/24448-2019-05-31/saHon8l0idgsd6yjSXkb_1559293361228" />
                <noscript>
                  &lt;img src="https://cdn.mservice.io/static/gcs_partner_m4b/24448-2019-05-31/saHon8l0idgsd6yjSXkb_1559293361228" width="80px" alt="logo-momo" /&gt;</noscript>
              </a>
              <a href="https://momo.vn" style={{float: 'right'}}>
                <img className="logo-image-size" src="/gw_payment/faces/javax.faces.resource/material/img/logo-1.png" width="80px" alt="logo-momo" />
              </a>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12">
                <div className="message" id="loginForm">
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                      <div className="scan-qr-code">
                        <h2>Quét mã để thanh toán</h2>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                      <div className="qr-code">
                        <img className="image-qr-code" src="/gw_payment/qrcode/image/receipt?key=ffa297ea562b2d430505680d367ff4d174bca5a0" alt="paymentcode" />
                        <p className="hidden-md">
                          Mã QR hết hạn sau: <b name="expiredAt" style={{fontSize: '1rem'}}>02:06</b>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                      <div className="info-qr-code">
                        <p>
                          <img width={25} src="/gw_payment/faces/javax.faces.resource/material/img/qr-code-1.png" alt />
                          Sử dụng App <b>MoMo</b> hoặc
                          <br /> ứng dụng Camera hỗ trợ QR code để quét mã.
                        </p>
                        <p className="hidden-xs">
                          <i className="fa fa-spinner fa-spin" />
                          Đang chờ bạn quét ...
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-12">
          <div className="row info-box-ipad hidden-md">
            <div className="col-xs-4 col-sm-4 col-md-4 info-box-border">
              <div style={{wordBreak: 'break-all'}}>
                <i className="fa fa-credit-card" aria-hidden="true" style={{}} />
                <h5 style={{paddingLeft: 5}}>Thông tin</h5>
                <span style={{whiteSpace: 'pre-wrap'}}>024-20240426030217-129004294</span>
              </div>
            </div>
            <div className="col-xs-4 col-sm-4 col-md-4 info-box-border">
              <i className="fa fa-credit-card" aria-hidden="true" style={{}} />
              <h5 style={{paddingLeft: 5}}>Số tiền</h5>
              <b>318.000đ</b>
            </div>
            <div className="col-xs-4 col-sm-4 col-md-4 nowrap">
              <div style={{wordBreak: 'break-all'}}><i className="fa fa-barcode" aria-hidden="true" style={{}} />
                <h5 style={{paddingLeft: 5}}>Mã giao dịch</h5>
                <span style={{whiteSpace: 'pre-wrap'}}>129004294</span>
              </div>
            </div>
            <div className="back-merchant">
              <a href="https://payment.momo.vn/gw_payment/m2?id=5e08147e1ce85b6e60a6cf394a9da8c15365b5c0" style={{color: '#e8e8e8', fontWeight: 200, cursor: 'pointer'}} id="cancelOrderT">
                <i className="fa fa-arrow-left" aria-hidden="true" style={{}} />
                <span>Quay lại</span></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="container-fluid hidden-xs">
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12">
          <div className="row-pci footer-pci" style={{}}>
            <a href="https://momo.vn" style={{textAlign: 'right'}}>
              <img src="/gw_payment/faces/javax.faces.resource/material/img/pci.png" className="logo-pci" alt="pci" style={{paddingTop: '5%'}} />
            </a>
          </div>
          <div className="copyrights text-center">
            <p style={{color: '#737373', fontSize: '11pt', fontWeight: 'bold'}}>
              <br />
              © 2019 - Cổng thanh toán qua Ví điện tử <a href="https://momo.vn">MoMo</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="container hidden-md">
      <div className="row">
        <div className="col-xs-12 col-sm-3">
          <div className="row-pci footer-pci" style={{}}>
            <a href="https://momo.vn" style={{textAlign: 'right'}}>
              <img src="/gw_payment/faces/javax.faces.resource/material/img/pci.png" className="logo-pci" alt="pci" style={{paddingTop: '5%'}} />
            </a>
          </div>
        </div>
        <div className="col-xs-12 col-sm-9 info-footer">
          <div className="navbar-header" style={{position: 'relative'}}>
            <div className="col-xs-12 col-sm-12 col-md-12" style={{paddingRight: 0, paddingLeft: 0}}>
              <img src="/gw_payment/faces/javax.faces.resource/images/hotline.svg" alt="logo-security" width={35} />
              <span>1900 54 54 41</span>
              <img src="/gw_payment/faces/javax.faces.resource/images/email.svg" alt="logo-security" width={35} />
              <a href="mailto:hotro@momo.vn"><span>hotro@momo.vn</span></a>
            </div>
          </div>
          <div className="copyrights">
            <p style={{color: '#737373', fontSize: '10pt', fontWeight: 'bold'}}>
              <br />
              © 2019 - Cổng thanh toán qua Ví điện tử <a href="https://momo.vn">MoMo</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div> */}
         <form action="@{/submitOrder}" method="post">
          <div class="form-group">
            <label for="amount">Số tiền:</label>
            <input type="number" class="form-control" id="amount" name="amount" value={total} />
          </div>
          <div class="form-group">
            <label for="orderInfo">Thông tin đơn hàng:</label>
            <input type="text" class="form-control" id="orderInfo" name="orderInfo" value={""} />
          </div>
          <button type="submit" class="btn btn-primary">Thanh toán</button>
        </form>
      </div>
    </>
  );
}
