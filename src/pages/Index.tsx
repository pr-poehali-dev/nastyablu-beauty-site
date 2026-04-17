import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE =
  "https://cdn.poehali.dev/projects/36c4fada-3118-44f0-bda0-44e4bb39c16f/files/a7a82c66-c00b-42a9-aed9-0ed4ef5ffa5b.jpg";

const SERVICES = [
  {
    id: "botox",
    name: "Ботокс для волос",
    desc: "Интенсивное восстановление, разглаживание и блеск",
    price: 3500,
    duration: "2–3 часа",
    tag: "Хит",
  },
  {
    id: "keratin",
    name: "Кератиновое выпрямление",
    desc: "Долговременное выпрямление с эффектом до 6 месяцев",
    price: 5500,
    duration: "3–4 часа",
    tag: "Популярно",
  },
  {
    id: "regen",
    name: "Реконструкция структуры",
    desc: "Глубокое восстановление повреждённых и ломких волос",
    price: 6000,
    duration: "3–5 часов",
    tag: "Флагман",
  },
  {
    id: "collagen",
    name: "Коллагеновое обёртывание",
    desc: "Питание, увлажнение и защита каждого волоса",
    price: 4000,
    duration: "2 часа",
    tag: "",
  },
  {
    id: "olaplex",
    name: "Olaplex-терапия",
    desc: "Восстановление дисульфидных связей внутри волоса",
    price: 4500,
    duration: "1.5–2 часа",
    tag: "Премиум",
  },
  {
    id: "plasma",
    name: "Плазмолифтинг кожи головы",
    desc: "Стимуляция роста и укрепление волосяных луковиц",
    price: 7000,
    duration: "1.5 часа",
    tag: "",
  },
];

const LENGTH_MULTIPLIERS = [
  { id: "short", label: "Короткие", multiplier: 1.0 },
  { id: "medium", label: "Средние", multiplier: 1.3 },
  { id: "long", label: "Длинные", multiplier: 1.6 },
  { id: "vlong", label: "Очень длинные", multiplier: 2.0 },
];

const WORKS = [
  {
    before: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&q=80",
    after: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80",
    label: "Ботокс + Реконструкция",
  },
  {
    before: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&q=80",
    after: "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?w=400&q=80",
    label: "Кератиновое выпрямление",
  },
  {
    before: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&q=80",
    after: "https://images.unsplash.com/photo-1617791160536-598cf32026fb?w=400&q=80",
    label: "Olaplex-терапия",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

export default function Index() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedLength, setSelectedLength] = useState("medium");
  const [form, setForm] = useState({ name: "", phone: "", comment: "" });
  const [sent, setSent] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const heroSection = useInView(0);
  const servicesSection = useInView(0.1);
  const worksSection = useInView(0.1);
  const calcSection = useInView(0.1);
  const contactSection = useInView(0.1);

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const multiplier =
    LENGTH_MULTIPLIERS.find((l) => l.id === selectedLength)?.multiplier ?? 1;

  const total = selectedServices.reduce((sum, id) => {
    const s = SERVICES.find((s) => s.id === id);
    return sum + (s ? Math.round(s.price * multiplier) : 0);
  }, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollTo("hero")}
            className="font-display text-2xl font-light tracking-widest text-dark-brown"
          >
            nastyablu
          </button>
          <div className="hidden md:flex items-center gap-8">
            {[
              ["services", "Услуги"],
              ["works", "Работы"],
              ["calculator", "Калькулятор"],
              ["contact", "Запись"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="nav-link font-body text-sm font-medium tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                {label}
              </button>
            ))}
          </div>
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-border px-6 py-4 flex flex-col gap-4">
            {[
              ["services", "Услуги"],
              ["works", "Работы"],
              ["calculator", "Калькулятор"],
              ["contact", "Запись"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-left font-body text-sm font-medium uppercase tracking-widest text-muted-foreground"
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center grain-overlay overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Nastyablu Studio"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        </div>

        <div
          ref={heroSection.ref}
          className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16"
        >
          <div
            className={`max-w-xl ${heroSection.visible ? "animate-fade-in-up" : "opacity-0-init"}`}
          >
            <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4">
              Студия реконструкции волос
            </p>
            <h1 className="font-display text-7xl md:text-9xl font-light leading-none text-dark-brown mb-2">
              Nasty
            </h1>
            <h1 className="font-display text-7xl md:text-9xl font-light leading-none text-shimmer mb-8">
              ablu
            </h1>
            <p className="font-body text-base font-light leading-relaxed text-muted-foreground mb-10 max-w-sm">
              Профессиональное восстановление волос любой степени повреждения.
              Результат, который видно с первого сеанса.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollTo("contact")}
                className={`px-8 py-3.5 bg-gold text-white font-body text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:opacity-90 hover:shadow-lg ${heroSection.visible ? "animate-fade-in-up delay-200" : "opacity-0-init"}`}
              >
                Записаться
              </button>
              <button
                onClick={() => scrollTo("works")}
                className={`px-8 py-3.5 border border-border text-foreground font-body text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:border-gold hover:text-gold ${heroSection.visible ? "animate-fade-in-up delay-300" : "opacity-0-init"}`}
              >
                Смотреть работы
              </button>
            </div>
          </div>

          <div
            className={`mt-20 flex flex-wrap gap-12 ${heroSection.visible ? "animate-fade-in-up delay-500" : "opacity-0-init"}`}
          >
            {[
              ["500+", "Клиентов"],
              ["6", "Лет опыта"],
              ["98%", "Довольных"],
              ["12", "Процедур"],
            ].map(([num, label]) => (
              <div key={label}>
                <div className="font-display text-4xl font-light text-gold">
                  {num}
                </div>
                <div className="font-body text-xs uppercase tracking-widest text-muted-foreground mt-1">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-gold animate-pulse" />
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-6">
          <div
            ref={servicesSection.ref}
            className={servicesSection.visible ? "animate-fade-in-up" : "opacity-0-init"}
          >
            <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-3 text-center">
              Что мы делаем
            </p>
            <h2 className="font-display text-5xl md:text-6xl font-light text-center text-dark-brown mb-4">
              Услуги
            </h2>
            <div className="w-12 h-px bg-gold mx-auto mb-14" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => (
              <div
                key={service.id}
                className={`group relative bg-white border border-border p-8 transition-all duration-300 hover:shadow-xl hover:border-gold/40 hover:-translate-y-1 ${servicesSection.visible ? `animate-fade-in-up` : "opacity-0-init"}`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {service.tag && (
                  <span className="absolute top-4 right-4 font-body text-xs font-medium uppercase tracking-widest text-gold bg-gold-light px-2 py-1">
                    {service.tag}
                  </span>
                )}
                <div className="w-8 h-px bg-gold mb-6" />
                <h3 className="font-display text-2xl font-light text-dark-brown mb-3">
                  {service.name}
                </h3>
                <p className="font-body text-sm font-light text-muted-foreground leading-relaxed mb-6">
                  {service.desc}
                </p>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="font-display text-3xl font-light text-foreground">
                      от {service.price.toLocaleString("ru")} ₽
                    </div>
                    <div className="font-body text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <Icon name="Clock" size={12} />
                      {service.duration}
                    </div>
                  </div>
                  <button
                    onClick={() => scrollTo("contact")}
                    className="font-body text-xs font-medium uppercase tracking-widest text-gold border border-gold px-4 py-2 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-gold hover:text-white"
                  >
                    Записаться
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKS */}
      <section id="works" className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div
            ref={worksSection.ref}
            className={worksSection.visible ? "animate-fade-in-up" : "opacity-0-init"}
          >
            <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-3 text-center">
              До и после
            </p>
            <h2 className="font-display text-5xl md:text-6xl font-light text-center text-dark-brown mb-4">
              Работы мастеров
            </h2>
            <div className="w-12 h-px bg-gold mx-auto mb-14" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {WORKS.map((work, i) => (
              <div
                key={i}
                className={worksSection.visible ? "animate-fade-in-up" : "opacity-0-init"}
                style={{ animationDelay: `${i * 200}ms` }}
              >
                <div className="relative overflow-hidden group">
                  <div className="grid grid-cols-2 gap-1">
                    <div className="relative overflow-hidden aspect-[3/4]">
                      <img
                        src={work.before}
                        alt="До"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute bottom-2 left-2 font-body text-xs uppercase tracking-widest bg-background/80 px-2 py-1 text-muted-foreground">
                        До
                      </div>
                    </div>
                    <div className="relative overflow-hidden aspect-[3/4]">
                      <img
                        src={work.after}
                        alt="После"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute bottom-2 right-2 font-body text-xs uppercase tracking-widest bg-gold/90 px-2 py-1 text-white">
                        После
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 font-display text-lg font-light text-dark-brown text-center">
                  {work.label}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <p className="font-body text-sm text-muted-foreground mb-6">
              Больше работ в нашем Instagram
            </p>
            <a
              href="https://instagram.com/nastyablu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-sm font-medium uppercase tracking-widest text-gold border border-gold px-6 py-3 transition-all hover:bg-gold hover:text-white"
            >
              <Icon name="Instagram" size={16} />
              @nastyablu
            </a>
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="py-24 bg-cream">
        <div className="max-w-4xl mx-auto px-6">
          <div
            ref={calcSection.ref}
            className={calcSection.visible ? "animate-fade-in-up" : "opacity-0-init"}
          >
            <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-3 text-center">
              Рассчитайте стоимость
            </p>
            <h2 className="font-display text-5xl md:text-6xl font-light text-center text-dark-brown mb-4">
              Калькулятор
            </h2>
            <div className="w-12 h-px bg-gold mx-auto mb-14" />
          </div>

          <div className="bg-white border border-border p-8 md:p-12">
            <div className="mb-10">
              <h3 className="font-body text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground mb-5">
                1. Длина волос
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {LENGTH_MULTIPLIERS.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setSelectedLength(l.id)}
                    className={`py-3 px-4 border font-body text-sm font-medium transition-all duration-200 ${
                      selectedLength === l.id
                        ? "border-gold bg-gold-light text-dark-brown"
                        : "border-border text-muted-foreground hover:border-gold/50"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <h3 className="font-body text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground mb-5">
                2. Выберите процедуры
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {SERVICES.map((service) => {
                  const isSelected = selectedServices.includes(service.id);
                  const calcPrice = Math.round(service.price * multiplier);
                  return (
                    <button
                      key={service.id}
                      onClick={() => toggleService(service.id)}
                      className={`flex items-center justify-between p-4 border text-left transition-all duration-200 ${
                        isSelected
                          ? "border-gold bg-gold-light"
                          : "border-border hover:border-gold/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 border flex-shrink-0 flex items-center justify-center transition-all ${
                            isSelected
                              ? "border-gold bg-gold"
                              : "border-muted-foreground"
                          }`}
                        >
                          {isSelected && (
                            <Icon name="Check" size={10} className="text-white" />
                          )}
                        </div>
                        <span className="font-body text-sm text-foreground">
                          {service.name}
                        </span>
                      </div>
                      <span className="font-display text-lg font-light text-gold ml-4 flex-shrink-0">
                        {calcPrice.toLocaleString("ru")} ₽
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              className={`border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-500 ${total > 0 ? "opacity-100" : "opacity-50"}`}
            >
              <div>
                <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-1">
                  Итого
                </p>
                <p className="font-display text-5xl font-light text-dark-brown">
                  {total > 0 ? `${total.toLocaleString("ru")} ₽` : "0 ₽"}
                </p>
                {selectedServices.length > 0 && (
                  <p className="font-body text-xs text-muted-foreground mt-1">
                    {selectedServices.length}{" "}
                    {selectedServices.length === 1
                      ? "процедура"
                      : selectedServices.length < 5
                        ? "процедуры"
                        : "процедур"}{" "}
                    ·{" "}
                    {LENGTH_MULTIPLIERS.find(
                      (l) => l.id === selectedLength
                    )?.label.toLowerCase()}{" "}
                    волосы
                  </p>
                )}
              </div>
              <button
                onClick={() => scrollTo("contact")}
                disabled={total === 0}
                className="px-10 py-4 bg-gold text-white font-body text-sm font-medium uppercase tracking-widest transition-all hover:opacity-90 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Записаться с расчётом
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-background">
        <div className="max-w-5xl mx-auto px-6">
          <div
            ref={contactSection.ref}
            className={contactSection.visible ? "animate-fade-in-up" : "opacity-0-init"}
          >
            <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-3 text-center">
              Мы рядом
            </p>
            <h2 className="font-display text-5xl md:text-6xl font-light text-center text-dark-brown mb-4">
              Запись
            </h2>
            <div className="w-12 h-px bg-gold mx-auto mb-14" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="font-display text-3xl font-light text-dark-brown mb-8">
                Приходите в студию
              </h3>
              <div className="space-y-6">
                {[
                  {
                    icon: "MapPin",
                    label: "Адрес",
                    value: "ул. Примерная, д. 10, Москва",
                  },
                  { icon: "Phone", label: "Телефон", value: "+7 (999) 123-45-67" },
                  {
                    icon: "MessageCircle",
                    label: "WhatsApp",
                    value: "+7 (999) 123-45-67",
                  },
                  {
                    icon: "Clock",
                    label: "Часы работы",
                    value: "Пн–Сб: 10:00–20:00\nВс: 11:00–18:00",
                  },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex gap-4">
                    <div className="w-10 h-10 border border-border flex items-center justify-center flex-shrink-0">
                      <Icon name={icon} size={16} className="text-gold" />
                    </div>
                    <div>
                      <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-1">
                        {label}
                      </p>
                      <p className="font-body text-sm text-foreground whitespace-pre-line">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex gap-4">
                {[
                  { icon: "Instagram", label: "Instagram" },
                  { icon: "MessageCircle", label: "Telegram" },
                  { icon: "Phone", label: "WhatsApp" },
                ].map(({ icon, label }) => (
                  <button
                    key={label}
                    title={label}
                    className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:border-gold hover:text-gold transition-all duration-200"
                  >
                    <Icon name={icon} size={16} />
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="bg-cream border border-border p-8">
              {sent ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-8">
                  <div className="w-14 h-14 border border-gold flex items-center justify-center mb-6">
                    <Icon name="Check" size={24} className="text-gold" />
                  </div>
                  <h3 className="font-display text-3xl font-light text-dark-brown mb-3">
                    Заявка отправлена
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">
                    Мы свяжемся с вами в течение часа для подтверждения записи
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-display text-2xl font-light text-dark-brown mb-6">
                    Оставьте заявку
                  </h3>
                  <div>
                    <label className="font-body text-xs uppercase tracking-widest text-muted-foreground block mb-2">
                      Ваше имя *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-white border border-border px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:border-gold transition-colors placeholder:text-muted-foreground/50"
                      placeholder="Анастасия"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs uppercase tracking-widest text-muted-foreground block mb-2">
                      Телефон *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className="w-full bg-white border border-border px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:border-gold transition-colors placeholder:text-muted-foreground/50"
                      placeholder="+7 (999) 000-00-00"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs uppercase tracking-widest text-muted-foreground block mb-2">
                      Комментарий / желаемая процедура
                    </label>
                    <textarea
                      value={form.comment}
                      onChange={(e) =>
                        setForm({ ...form, comment: e.target.value })
                      }
                      rows={3}
                      className="w-full bg-white border border-border px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:border-gold transition-colors resize-none placeholder:text-muted-foreground/50"
                      placeholder="Например: интересует ботокс для волос средней длины..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-gold text-white font-body text-sm font-medium uppercase tracking-widest transition-all hover:opacity-90 hover:shadow-lg"
                  >
                    Отправить заявку
                  </button>
                  <p className="font-body text-xs text-muted-foreground text-center">
                    Нажимая кнопку, вы соглашаетесь с обработкой персональных
                    данных
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-dark-brown text-white/60 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-display text-2xl font-light text-white/90 tracking-widest">
            nastyablu
          </p>
          <p className="font-body text-xs tracking-widest uppercase">
            © 2024 Студия реконструкции волос
          </p>
          <div className="flex gap-6">
            {[
              ["services", "Услуги"],
              ["works", "Работы"],
              ["contact", "Запись"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="font-body text-xs uppercase tracking-widest hover:text-white transition-colors"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
