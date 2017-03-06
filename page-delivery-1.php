<div class="ems-page page-cart step1 step2">
    <script type="text/javascript">
        $("body").addClass("page-cart-layout");   
    </script>
    <!--Popup new address-->
    <div class="popup-default popup-default-new-address">
        <div class="popup-default-wrapper">
            <div class="popup-default-inner">
                <div class="popup-default-header">
                    <span>YENİ ADRES EKLE</span>
                    <a href="javascript:void(0);" class="btn-popup-close"><i class="icon-ico_close"></i></a>
                </div>

                <!--body-->
                <div class="popup-default-body">
                    <div class="ems-form ems-form-horizontal">
                        <div class="ems-form-inner">
                            <div class="ems-message ems-message-error"><span>Kayıt işlemi başarısız ise!</span></div>
                            <div class="ems-message ems-message-success"><span>Kayıt işlemi başarılı ise!</span></div>
                            <div class="ems-field text">
                                <div class="ems-form-label"><span>AD SOYAD / FİRMA*</span></div>
                                <div class="ems-form-obj"><input type="text"></div>
                            </div>
                            <div class="ems-field text">
                                <div class="ems-form-label"><span>CEP TELEFONU*</span></div>
                                <div class="ems-form-obj"><input type="text"></div>
                            </div>
                            <div class="ems-field text">
                                <div class="ems-form-obj">
                                    <select>
                                        <option>ÜLKE</option>
                                        <option>TÜRKİYE</option>
                                        <option>RUSYA</option>
                                        <option>ALMANYA</option>
                                    </select>
                                </div>
                            </div>
                            <div class="ems-field text">
                                <div class="ems-form-obj">
                                    <select>
                                        <option>ŞEHİR</option>
                                        <option>İSTANBUL</option>
                                        <option>ANKARA</option>
                                        <option>İZMİR</option>
                                    </select>
                                </div>    
                            </div>
                            <div class="ems-field text">
                                <div class="ems-form-obj">
                                    <select>
                                        <option>İLÇE</option>
                                        <option>ESENLER</option>
                                        <option>ZEYTİNBURNU</option>
                                        <option>BAKIRKÖY</option>
                                    </select>
                                </div>
                            </div>
                            <div class="ems-field text">
                                <div class="ems-form-label"><span>ADRES</span></div>
                                <div class="ems-form-obj"><textarea></textarea></div>
                            </div>
                            <div class="ems-field text">
                                <div class="ems-form-label"><span>E-POSTA*</span></div>
                                <div class="ems-form-obj"><input type="text"></div>
                            </div>
                            <div class="ems-field text ems-field-middle">
                                <div class="ems-form-label"><span>POSTA KODU</span></div>
                                <div class="ems-form-obj"><input type="text"></div>
                            </div>
                            <div class="ems-field ems-field-check ems-field-invoice-type">
                                <div class="address-type-title"><span>Fatura Tipi*</span></div>
                                <div class="ems-form-double">
                                    <div class="ems-form-obj"><input type="radio" rel="1"><span>Şahıs</span></div>
                                    <div class="ems-form-obj"><input type="radio" rel="2"><span>Kurumsal</span></div>
                                </div>
                                <div class="ems-form-obj ems-form-obj-full">
                                    <div class="ems-form-label" rel="1"><span>T.C. KİMLİK NUMARASI</span></div>
                                    <div class="ems-form-label" rel="2" style="display:none;"><span>VERGİ KİMLİK NUMARASI</span></div>
                                    <input type="text" rel="1"><!--Kullanıcı (Şahıs) radio butonuna tıklandıgında gösterilecek olan input default olarak da bu input active olacaktır-->
                                    <input type="text" rel="2" style="display:none;"><!--Kullanıcı (Kurumsal) radio butonuna tıklandıgında gösterilecek olan input active olacaktır-->
                                </div>
                            </div>
                            <div class="ems-field submit">
                                <a href="javascript:void(0);" class="btn-default btn-default-delivery"><span>EKLE</span></a>
                            </div>
                        </div>
                    </div>
                </div>
                <!--body-->
                <div class="popup-default-footer"></div>
            </div>
        </div>
    </div>
    <!--Popup new address-->
    
    <div class="ems-container">
        <div class="row-holder-1 ems-inline">
            <div class="ems-page-default ems-page-order-delivery">

                <!--Left-->
                <div class="ems-page-default-left">
                    <div class="ems-page-default-title ems-none"><span>Tesmimat Bilgileri</span></div>

                    <!--Tab-->
                    <div class="ems-tab ems-tab-vertical ems-tab-delivery">
                        <div class="ems-tab-inner">
                            <ul class="navigation-js">
                                <li rel="tab-1"><a href="javascript:void(0);"><span>Teslimat Bilgileri</span></a></li>
                                <li rel="tab-2"><a href="javascript:void(0);"><span>Ödeme Bilgileri</span></a></li>
                            </ul>
                            <ul class="content-js">
                                <li rel="tab-1">
                                    <a href="javascript:void(0);"><span>Teslimat Bilgileri</span></a>
                                    <div class="content">
                                        <div class="ems-form ems-form-horizontal">
                                            <div class="ems-form-inner">
                                                <div class="ems-field ems-field-check address-type address-type-1">
                                                    <div class="ems-form-obj"><input type="radio"><span>Adrese Teslimat</span></div>
                                                    <div class="ems-form-obj"><input type="radio"><span>Mağazadan Teslimat</span><i class="tooltip"></i></div>
                                                </div>
                                                <div class="address-holder-double">
                                                    <div class="ems-field address-result">
                                                        <div class="address-type-title"><span>Fatura Adresi</span></div>
                                                        <div class="ems-form-obj">
                                                            <select>
                                                                <option>İŞ ADRESİM</option>
                                                                <option>ADRES SEÇİNİZ</option>
                                                                <option>YENİ ADRES EKLE</option>
                                                            </select>
                                                        </div>
                                                        <div class="ems-form-text">
                                                            <p>Ataköy Konakları Adnan Kahveci Bulvarı 6. Kısım Ataköy AVM
                                                            <br/>+90 212 560 71 79</p>
                                                        </div>
                                                        <div class="address-update"><a href="javascript:void(0);"><span>Adresi Düzenle</span></a></div>
                                                    </div>
                                                    <div class="ems-field address-result">
                                                        <div class="address-type-title"><span>Teslimat Adresi</span></div>
                                                        <div class="ems-form-obj">
                                                            <select>
                                                                <option>İŞ ADRESİM</option>
                                                                <option>ADRES SEÇİNİZ</option>
                                                                <option>YENİ ADRES EKLE</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="ems-field ems-field-check ems-field-check-1">
                                                    <div class="address-type-title"><span>Fatura Adresi Seçiniz</span></div>
                                                    <div class="ems-form-obj"><input type="radio"><span>Faturamı Siparişimle Aynı Adrese Gönder</span></div>
                                                </div>
                                                <div class="ems-field ems-field-check ems-field-gift-type">
                                                    <div class="ems-field-left">
                                                        <div class="ems-form-obj ems-form-obj-interval"><input type="radio"><span>Gönderi Notu</span></div>
                                                        <div class="ems-form-obj ems-form-obj-interval"><input type="radio"><span>Hediye Notu</span></div>
                                                        <div class="ems-form-obj"><textarea></textarea></div>
                                                    </div>
                                                    <div class="ems-field-right">
                                                        <div class="ems-form-cotinue">
                                                            <a href="javascript:void(0);" class="btn-default btn-default-delivery"><span>DEVAM ET</span></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li rel="tab-2">
                                    <a href="javascript:void(0);"><span>Ödeme Bilgileri</span></a>
                                    <div class="content">
                                        <!--Coupon code-->
                                        <div class="ems-cart-coupon">
                                            <div class="ems-message ems-message-error"><span>Hatalı kupon Kodu!</span></div>
                                            <div class="ems-cart-coupon-header"><span>İndirim kuponu</span></div>
                                            <div class="ems-cart-coupon-body">
                                                <div class="ems-cart-coupon-check"><input type="radio"><span>Yargıcı Kartınızda XTL puan bulunmaktadır.</span></div>
                                                <div class="ems-cart-coupon-obj">
                                                    <div class="ems-cart-coupon-use">
                                                        <input type="text" placeholder="XTL Kullanılsın">
                                                        <a href="javascript:void(0);" class="btn-default btn-default-coupon"><span>ONAYLA</span></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!--Coupon code-->

                                        <!--Tab-->
                                        <div class="ems-tab ems-tab-horizontal ems-tab-pay-info">
                                            <div class="ems-tab-inner">
                                                <ul class="navigation-js">
                                                    <li rel="cart"><a href="javascript:void(0);"><span>KREDİ KARTI</span></a></li>
                                                    <li rel="pay"><a href="javascript:void(0);"><span>KAPIDA ÖDEME</span></a></li>
                                                    <li rel="play"><a href="javascript:void(0);"><span>GARANTİ PLAY</span></a></li>
                                                </ul>
                                                <ul class="content-js">
                                                    <li rel="cart">
                                                        <a href="javascript:void(0);"><span>KREDİ KARTI</span></a>
                                                        <div class="content clearfix">
                                                            <div class="ems-form-content clearfix">
                                                            <!--Form-->
                                                            <div class="ems-form ems-form-horizontal">
                                                                <div class="ems-form-inner">
                                                                    <div class="ems-field text">
                                                                        <div class="ems-form-label"><span>KREDİ KARTI NUMARASI*</span></div>
                                                                        <div class="ems-form-obj"><input type="text"></div>
                                                                    </div>
                                                                    <div class="ems-field ems-field-triple clearfix">
                                                                        <div class="ems-form-obj">
                                                                            <select>
                                                                                <option>01</option>
                                                                                <option>02</option>
                                                                                <option>03</option>
                                                                                <option>04</option>
                                                                                <option>05</option>
                                                                                <option>06</option>
                                                                            </select>
                                                                        </div>
                                                                        <div class="ems-form-obj">
                                                                            <select>
                                                                                <option>2017</option>
                                                                                <option>2016</option>
                                                                                <option>2015</option>
                                                                                <option>2014</option>
                                                                                <option>2013</option>
                                                                            </select>
                                                                        </div>
                                                                        <div class="ems-form-obj">
                                                                            <input type="text">
                                                                        </div>
                                                                        <i class="tooltip"><div></div></i>
                                                                    </div>
                                                                    <div class="ems-field text">
                                                                        <div class="ems-form-label"><span>KART ÜZERİNDEKİ İSİM</span></div>
                                                                        <div class="ems-form-obj"><input type="text"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <!--Form-->

                                                            <!--Installment-->
                                                            <div class="ems-inst-opt">
                                                                <div class="ems-inst-opt-wrp">
                                                                    <span>TAKSİT SEÇENEKLERİ</span>
                                                                    <ul>
                                                                        <li class="title"><span>Plan</span><span class="obj">Aylık Tutar</span><span class="obj">Total</span></li>
                                                                        <li class="line"><span><input type="radio">TEK ÇEKİM</span><span class="obj"><span class="total">199</span><span class="penny">,00</span><span class="currency">TL</span><span class="x-total">X 1</span></span><span class="obj"><span class="total">199</span><span class="penny">,00</span><span class="currency">TL</span></span></li>
                                                                        <li class="line"><span><input type="radio">2 TAKSİT</span><span class="obj"><span class="total">199</span><span class="penny">,00</span><span class="currency">TL</span><span class="x-total">X 2</span></span><span class="obj"><span class="total">199</span><span class="penny">,00</span><span class="currency">TL</span></span></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <!--Installment-->
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li rel="pay">
                                                        <a href="javascript:void(0);"><span>KAPIDA ÖDEME</span></a>
                                                        <div class="content">
                                                            <div class="ems-form-content clearfix">
                                                                <div class="ems-form ems-form-horizontal">
                                                                    <div class="ems-form-inner">
                                                                        <span class="inline-text">Kapıda ödeme:</span>
                                                                        <div class="ems-field text">
                                                                            <textarea></textarea>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li rel="play">
                                                        <a href="javascript:void(0);"><span>GARANTİ PLAY</span></a>
                                                        <div class="content">
                                                            <div class="ems-form-content clearfix">
                                                                <div class="ems-form ems-form-horizontal">
                                                                    <div class="ems-form-inner">
                                                                        <span class="inline-text">Garanti pay:</span>
                                                                        <div class="ems-field text">
                                                                            <textarea></textarea>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <!--Tab-->

                                        <!--question btn-->
                                            <div class="balance-query"><a href="javascript:void(0);" class="btn-link">Bakiye Sorgula</a></div>
                                        <!--question btn-->

                                        <!--Cart grid-->
                                        <div class="ems-page-default-title"><span>Sipariş Özeti</span></div>
                                        <div class="ems-grid-default ems-grid-cart obj-step0">
                                            <div class="ems-grid-header">
                                                <div class="ems-grid-img">
                                                    <span>Ürün</span>
                                                </div>
                                                <div class="ems-grid-name">
                                                    <span>Ürün</span>
                                                </div>
                                                <div class="ems-grid-piece">
                                                    <span>Adet</span>
                                                </div>
                                                <div class="ems-grid-price">
                                                    <span>Fiyat</span>
                                                </div>
                                                <div class="ems-grid-price-total">
                                                    <span>Toplam fiyat</span>
                                                </div>
                                                <div class="ems-grid-delete">
                                                    <span>Sil</span>
                                                </div>
                                            </div>

                                            <!--Row-->
                                            <div class="ems-grid-row">
                                                <div class="ems-grid-img">
                                                    <a href=""><img src="/lab/projects/yargici/upload/products/cart/prd-130x130-1.jpg" /></a>
                                                </div>
                                                <div class="ems-grid-name">
                                                    <a href="javascript:void(0);"><span>YAKASI İŞLEME DETAYLI TRİKO</span></a>
                                                    <div class="ems-grid-size">
                                                        <span class="text">BEDEN:</span><span class="number">38</span>
                                                    </div>
                                                    <div class="ems-grid-code">
                                                        <span>7YKST5016X</span>
                                                    </div>
                                                </div>
                                                <div class="ems-grid-piece">
                                                    <div class="piece-wrapper">
                                                        <span>1</span>
                                                    </div>
                                                </div>
                                                <div class="ems-grid-price currency-ico">
                                                    <span class="gross-total">
                                                        <span class="total">149</span>
                                                        <span class="penny">,00</span>
                                                        <span class="currency">TL</span>
                                                    </span>
                                                </div>
                                                <div class="ems-grid-price-total currency-ico">
                                                    <span class="total">
                                                        <span class="total">298</span>
                                                        <span class="penny">,00</span>
                                                        <span class="currency">TL</span>
                                                    </span>
                                                </div>
                                                <div class="ems-grid-delete">
                                                    <a href="javascript:void(0);"><i class="icon-ico_close"></i></a>
                                                </div>
                                            </div>
                                            <div class="ems-grid-row">
                                                <div class="ems-grid-img">
                                                    <a href=""><img src="/lab/projects/yargici/upload/products/cart/prd-130x130-1.jpg" /></a>
                                                </div>
                                                <div class="ems-grid-name">
                                                    <a href="javascript:void(0);"><span>YAKASI İŞLEME DETAYLI TRİKO</span></a>
                                                    <div class="ems-grid-size">
                                                        <span class="text">BEDEN:</span><span class="number">38</span>
                                                    </div>
                                                    <div class="ems-grid-code">
                                                        <span>7YKST5016X</span>
                                                    </div>
                                                </div>
                                                <div class="ems-grid-piece">
                                                    <div class="piece-wrapper">
                                                        <span>1</span>
                                                    </div>
                                                </div>
                                                <div class="ems-grid-price currency-ico">
                                                    <span class="gross-total">
                                                        <span class="total">149</span>
                                                        <span class="penny">,00</span>
                                                        <span class="currency">TL</span>
                                                    </span>
                                                </div>
                                                <div class="ems-grid-price-total currency-ico">
                                                    <span class="total">
                                                        <span class="total">298</span>
                                                        <span class="penny">,00</span>
                                                        <span class="currency">TL</span>
                                                    </span>
                                                </div>
                                                <div class="ems-grid-delete">
                                                    <a href="javascript:void(0);"><i class="icon-ico_close"></i></a>
                                                </div>
                                            </div>
                                            <!--Row-->
                                        </div>
                                        <!--Cart grid-->

                                        <!--Address Info-->
                                        <div class="ems-cart-pay-adress clearfix">
                                            <div class="ems-delivery-address left">
                                                <div class="ems-delivery-address-lbl">
                                                    <span>FATURA ADRESİ</span>
                                                </div>
                                                <div class="ems-delivery-address-obj">
                                                    <h1>İş adresim</h1>
                                                    <span>Bereketzade Mh. Hacı Ali Sk. Bahtiyar Apt. 3/4 - Beyoğlu (Galata) / İstanbul İstanbul</span>
                                                </div>
                                            </div>
                                            <div class="ems-delivery-address right">
                                                <div class="ems-delivery-address-lbl">
                                                    <span>TESLİMAT ADRESİ</span>
                                                </div>
                                                <div class="ems-delivery-address-obj">
                                                    <h1>İş adresim</h1>
                                                    <span>Bereketzade Mh. Hacı Ali Sk. Bahtiyar Apt. 3/4 - Beyoğlu (Galata) / İstanbul İstanbul</span>
                                                </div>
                                            </div>
                                        </div>
                                        <!--Address Info-->

                                        <!--Sales forms-->
                                        <div class="ems-contracts">
                                            <div class="ems-contracts-inner">
                                                <div class="ems-contracts-form">
                                                    <span class="ems-contracts-title">ÖN BİLGİLENDİRME FORMU</span>
                                                    <div class="ems-contracts-form-inner">
                                                        <div class="ems-contracts-form-wrapper">
                                                            <h1>MADDE 2 - KONU </h1>
                                                            <p><b>2.1.</b>İşbu Mesafeli Satış Sözleşmesi’nin (“Sözleşme”) konusu, ALICI'nın SATICI'ya ait http://shop.yargici.com.tr (“İnternet Sitesi”) üzerinden elektronik ortamda siparişini yaptığı aşağıda nitelikleri ve satış fiyatı belirtilen ürünün satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun (“Kanun”) ve 27.11.2014 tarihli Mesafeli Sözleşmeler Yönetmeliği (“Yönetmelik”) hükümleri gereğince tarafların hak ve yükümlülüklerinin belirlenmesidir.</p>
                                                            <p><b>2.2.</b>Listelenen ve İnternet Sitesi’nde ilan edilen fiyatlar satış fiyatıdır. İlan edilen fiyatlar ve vaatler güncelleme</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="ems-contracts-form">
                                                    <span class="ems-contracts-title">SATIŞ SÖZLEŞMESİ</span>
                                                    <div class="ems-contracts-form-inner">
                                                        <div class="ems-contracts-form-wrapper">
                                                            <h1>MADDE 2 - KONU </h1>
                                                            <p><b>2.1.</b>İşbu Mesafeli Satış Sözleşmesi’nin (“Sözleşme”) konusu, ALICI'nın SATICI'ya ait http://shop.yargici.com.tr (“İnternet Sitesi”) üzerinden elektronik ortamda siparişini yaptığı aşağıda nitelikleri ve satış fiyatı belirtilen ürünün satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun (“Kanun”) ve 27.11.2014 tarihli Mesafeli Sözleşmeler Yönetmeliği (“Yönetmelik”) hükümleri gereğince tarafların hak ve yükümlülüklerinin belirlenmesidir.</p>
                                                            <p><b>2.2.</b>Listelenen ve İnternet Sitesi’nde ilan edilen fiyatlar satış fiyatıdır. İlan edilen fiyatlar ve vaatler güncelleme</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="ems-contracts-form-check"><input type="checkbox"><span>Ön Bilgilendirme Formu ve Satış Sözleşmesini okudum ve kabul ediyorum</span></div>
                                                <div class="ems-contracts-form-payment"><a href="javascript:void(0);" class="btn-default btn-default-payment"><span>ÖDEME YAP</span></a></div>
                                            </div>
                                        </div>
                                        <!--Sales forms-->

                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--Tab-->

                </div>
                <!--Left-->

                <!--Right-->
                <div class="ems-page-default-right">
                    <div class="ems-cart-summary">
                        <span class="title">Sipariş Özeti</span>
                        <div class="total-table-wrapper">
                            <ul class="total-table">
                                <li class="except-vat">
                                    <span class="lbl">KDV Hariç Toplam</span>
                                    <span class="obj"><span class="total">149</span><span class="penny">,00</span><span class="currency">TL</span></span>
                                </li>
                                <li class="total-vat">
                                    <span class="lbl">KDV</span>
                                    <span class="obj"><span class="total">9</span><span class="penny">,90</span><span class="currency">TL</span></span>
                                </li>
                                <li class="total-amount">
                                    <span class="lbl">TOPLAM</span>
                                    <span class="obj"><span class="total">205</span><span class="penny">,00</span><span class="currency">TL</span></span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!--Right-->
                <div class="ems-fixer"></div>
            </div>
        </div>
    </div>
</div>