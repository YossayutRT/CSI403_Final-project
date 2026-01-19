import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Plus, ChevronLeft, ChevronRight, ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --- Mock Data ---
const MOCK_PRODUCTS = [
  { id: 1, name: 'Artisan Sourdough', category: 'Bread', price: 120, image: 'https://www.kingarthurbaking.com/sites/default/files/recipe_legacy/6093-3-large.jpg', description: 'หมักธรรมชาติ 48 ชม.' },
  { id: 2, name: 'French Butter Croissant', category: 'Pastry', price: 85, image: 'https://www.lalevain.com/wp-content/uploads/2021/11/Xsant.jpg', description: 'เนยแท้ AOP นำเข้าจากฝรั่งเศส' },
  { id: 3, name: 'Strawberry Shortcake', category: 'Cake', price: 150, image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=600', description: 'ครีมสดแท้ เนื้อนุ่มละลาย' },
  { id: 4, name: 'Dark Chocolate Cookie', category: 'Cookie', price: 45, image: 'https://jessicainthekitchen.com/wp-content/uploads/2025/04/Double-Chunk-Chocolate-Cookies_19.jpg', description: 'ช็อกโกแลตเบลเยี่ยมเข้มข้น' },
  { id: 5, name: 'Traditional Baguette', category: 'Bread', price: 60, image: 'https://theculturecook.com/recipes/photos/small_439E5594-BCBD-721B-83386FD4E354BCD2.jpg', description: 'กรอบนอกนุ่มใน สูตรดั้งเดิม' },
  { id: 6, name: 'Uji Matcha Latte', category: 'Beverage', price: 90, image: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&q=80&w=600', description: 'มัทฉะเกรดพรีเมียมจากเกียวโต' },
  { id: 7, name: 'Lemon Tart', category: 'Pastry', price: 110, image: 'https://www.dinneratthezoo.com/wp-content/uploads/2015/04/lemon-meringue-tart-6.jpg', description: 'เปรี้ยวหวานลงตัว' },
  { id: 8, name: 'Red Velvet Cake', category: 'Cake', price: 160, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600', description: 'เนื้อเค้กนุ่มฟู ครีมชีสเข้มข้น' },
  { id: 9, name: 'Almond Biscotti', category: 'Cookie', price: 50, image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&q=80&w=600', description: 'กรอบ หอม อัลมอนด์แท้' },
  { id: 10, name: 'Iced Caramel Macchiato', category: 'Beverage', price: 95, image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=600', description: 'กาแฟเอสเพรสโซ่ชั้นดี ราดคาราเมล' },
  { id: 11, name: 'Focaccia Rosemary', category: 'Bread', price: 80, image: 'https://thirstyradish.com/wp-content/uploads/2020/09/Parmesan-Focaccia-with-Rosemary-and-Olives.jpg', description: 'ขนมปังอิตาเลียน หอมกลิ่นโรสแมรี่และน้ำมันมะกอก' },
  { id: 12, name: 'New York Cheesecake', category: 'Cake', price: 165, image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?auto=format&fit=crop&q=80&w=600', description: 'ชีสเค้กเนื้อเนียนแน่น ตัดรสด้วยฐานบิสกิตกรุบกรอบ' },
  { id: 13, name: 'Classic Cinnamon Roll', category: 'Pastry', price: 75, image: 'https://cdn1.wolfermans.com/wcsstore/Wolfermans/images/catalog/23_0050909_61A_18_018x.jpg', description: 'แป้งนุ่มชุ่มเนย หอมกลิ่นซินนามอน ราดเกลซวนิลา' },
  { id: 14, name: 'Peach Iced Tea', category: 'Beverage', price: 85, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=600', description: 'ชาพีชหอมหวานสดชื่น พร้อมเนื้อพีชแท้' },
  { id: 15, name: 'Dark Fudge Brownie', category: 'Cake', price: 65, image: 'https://images.unsplash.com/photo-1515037028865-0a2a82603f7c?auto=format&fit=crop&q=80&w=600', description: 'บราวนี่เนื้อหนึบ ช็อกโกแลตเข้มข้นเต็มคำ' },
  { id: 16, name: 'Japanese Shokupan', category: 'Bread', price: 120, image: 'https://www.marthastewart.com/thmb/xb1y9ndn-L5W7PAOjPr6LdUIED4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/MS-1521177-Shokupan-Japanese-milk-bread-shokupan-Beauty-3x2_40390-40749cc8d7424b12b86cfe33f5289178.jpg', description: 'ขนมปังนมสดญี่ปุ่น เนื้อนุ่มยืด ละลายในปาก' },
  { id: 17, name: 'Vanilla Eclair', category: 'Pastry', price: 90, image: 'https://images.unsplash.com/photo-1612203985729-70726954388c?auto=format&fit=crop&q=80&w=600', description: 'แป้งชูว์ไส้ครีมวานิลลาแท้ หวานน้อยละมุนลิ้น' },
  { id: 18, name: 'Premium Macarons (Box)', category: 'Cookie', price: 280, image: 'https://shop.abp.sg/cdn/shop/files/SeriesP16in1.jpg?v=1691409843&width=1946', description: 'มาการองรวมรส 6 ชิ้น กรอบนอกนุ่มใน' },
  { id: 19, name: 'Mixed Berry Smoothie', category: 'Beverage', price: 110, image: 'https://images.unsplash.com/photo-1553530979-7ee52a2670c4?auto=format&fit=crop&q=80&w=600', description: 'สมูทตี้เบอร์รี่รวม เปรี้ยวหวานลงตัว วิตามินซีสูง' },
  { id: 20, name: 'Cranberry Scone', category: 'Pastry', price: 65, image: 'https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&q=80&w=600', description: 'สโคนเนยสดผสมแครนเบอร์รี่ เสิร์ฟพร้อมแยม' },
  { id: 21, name: 'Tiramisu', category: 'Cake', price: 180, image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&q=80&w=600', description: 'เค้กอิตาเลียนรสกาแฟ สลับชั้นมาสคาร์โปเน่ชีส' },
  { id: 22, name: 'Whole Wheat Loaf', category: 'Bread', price: 95, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600', description: 'ขนมปังโฮลวีต 100% เพื่อสุขภาพ เนื้อแน่น' },
  { id: 23, name: 'Oatmeal Raisin Cookie', category: 'Cookie', price: 40, image: 'https://iambaker.net/wp-content/uploads/2024/10/Oatmeal-Raisin-Cookies-1.jpg', description: 'คุกกี้ข้าวโอ๊ตผสมลูกเกด หวานธรรมชาติ' },
  { id: 24, name: 'Rich Hot Chocolate', category: 'Beverage', price: 90, image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&q=80&w=600', description: 'ช็อกโกแลตร้อนพรีเมียม เข้มข้น ท็อปด้วยวิปครีม' },
];


const PROMO_BANNERS = [
  { 
    id: 1, 
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1600&auto=format&fit=crop', 
    title: 'Happiness in Bulk', 
    subtitle: 'ยิ่งเยอะยิ่งสุข! ซื้อเบเกอรี่ครบ 10 ชิ้น รับฟรีทันที 1 ชิ้น เติมเต็มความอร่อยได้ยกกล่อง', 
    tag: 'Best Value' 
  },
  { 
    id: 2, 
    image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?q=80&w=1600&auto=format&fit=crop', 
    title: 'Tasty Savings', 
    subtitle: 'อร่อยคุ้มค่าทุกคำสั่งซื้อ เมื่อช้อปครบ 300.- รับส่วนลดท้ายบิลทันที 10.-', 
    tag: 'Instant Discount' 
  },
  { 
    id: 3, 
    image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=1600&auto=format&fit=crop', 
    title: '9.9 Mega Delight', 
    subtitle: 'ปรากฏการณ์ความคุ้มแห่งปี โปรแรง 9 แถม 9! เฉพาะวันที่ 9 เดือน 9 วันเดียวเท่านั้น', 
    tag: 'Flash Sale' 
  },
  { 
    id: 4, 
    image: 'https://images.unsplash.com/photo-1612203985729-70726954388c?q=80&w=1600&auto=format&fit=crop', 
    title: 'Member Privilege', 
    subtitle: 'เอกสิทธิ์เฉพาะคุณ ใช้คะแนนสะสม 50 แต้ม แลกรับสิทธิ์ซื้อเครื่องดื่ม 1 แถม 1', 
    tag: 'Member Only' 
  },
  { 
    id: 5, 
    image: 'https://www.shiroiya.com/websys2024/wp-content/themes/shiroiya/assets/img/dine/bakery/pagehead.jpg', 
    title: 'Welcome to Family', 
    subtitle: 'เริ่มต้นความอร่อยกับเรา สมัครสมาชิกวันนี้ รับฟรี! Signature Soft Cookie 1 ชิ้น', 
    tag: 'New Member' 
  },
];


const CATEGORIES = [
  { id: 'all', name: 'All Menu' },
  { id: 'Bread', name: 'Bread' },
  { id: 'Cake', name: 'Cake' },
  { id: 'Cookie', name: 'Cookie' },
  { id: 'Pastry', name: 'Pastry' },
  { id: 'Beverage', name: 'Beverage' },
];

const Home = ({ addToCart }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev === PROMO_BANNERS.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide(prev => (prev === PROMO_BANNERS.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide(prev => (prev === 0 ? PROMO_BANNERS.length - 1 : prev - 1));

  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="home-container">
      
      {/* Banner */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <span className="hero-badge">SINCE 2026</span>
          <h1 className="hero-title">
            Crafting Happiness <br /> 
            <span className="highlight">One Bite at a Time</span>
          </h1>
          <p className="hero-subtitle">
            สัมผัสรสชาติเบเกอรี่โฮมเมดระดับพรีเมี่ยม อบสดใหม่ทุกเช้าด้วยวัตถุดิบนำเข้า <br /> ใส่ใจในทุกรายละเอียด เพื่อช่วงเวลาพิเศษของคุณ
          </p>
          
          <div className="search-wrapper">
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              placeholder="ค้นหาเมนูที่คุณชอบ..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* 2. PROMOTION CAROUSEL */}
      <section className="promo-section container">
        <div className="section-header-left">
          <div>
            <h2 className="section-title-modern">Offers for you</h2>
            <p className="section-subtitle-modern">โปรโมชั่นสุดพิเศษที่คุณไม่ควรพลาด</p>
          </div>
        
          <div className="carousel-nav">
            <button onClick={prevSlide}><ChevronLeft size={20}/></button>
            <button onClick={nextSlide}><ChevronRight size={20}/></button>
          </div>
        </div>

        <div className="modern-carousel">
          <div className="carousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {PROMO_BANNERS.map((banner) => (
              <div key={banner.id} className="carousel-card">
                <div className="carousel-bg" style={{ backgroundImage: `url(${banner.image})` }}>
                  {/* Glassmorphism Content Box */}
                  <div className="carousel-glass-content">
                    <span className="promo-tag">{banner.tag}</span>
                    <h3>{banner.title}</h3>
                    <p>{banner.subtitle}</p>
                   
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CATEGORIES & PRODUCTS */}
      <section className="product-display container">
        <div className="category-bar">
          {CATEGORIES.map(cat => (
            <button 
              key={cat.id} 
              className={`cat-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <h2 className="section-title-center">Menu Selection</h2>

        {filteredProducts.length === 0 ? (
          <div className="empty-state">
            <ShoppingBag size={48} />
            <p>ไม่พบสินค้าที่คุณค้นหา</p>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="card-image-wrapper">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <div className="card-overlay">
                    <button className="btn-quick-view" onClick={() => navigate('/menu')}>
                      รายละเอียด
                    </button>
                  </div>
                </div>
                <div className="card-content">
                  <div className="card-top">
                    <div className="card-meta">{product.category}</div>
                    <div className="rating"><Star size={12} fill="#ffc107" color="#ffc107"/> 4.8</div>
                  </div>
                  <h3 className="card-title">{product.name}</h3>
                  <p className="card-desc">{product.description}</p>
                  <div className="card-footer">
                    <span className="price">฿{product.price}</span>
                    <button className="btn-add" onClick={() => addToCart(product)}>
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;