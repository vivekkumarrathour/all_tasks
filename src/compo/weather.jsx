import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [cards, setCards] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('weatherCards') || '[]');
    } catch {
      return [];
    }
  });

  const [form, setForm] = useState({
    city: '', country: '', unit: 'C', temperature: '', feelsLike: '',
    condition: '', humidity: '', wind: '', windUnit: 'km/h'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    localStorage.setItem('weatherCards', JSON.stringify(cards));
  }, [cards]);

  // small helper to format numbers for storage/display
  const fmtTemp = v => (v === '' ? '' : Math.round(Number(v)));
  const fmtHumidity = v => (v === '' ? '' : Math.round(Number(v)));
  const fmtWind = v => (v === '' ? '' : (Math.round(Number(v) * 10) / 10).toFixed(1));

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.city.trim()) e.city = 'City is required.';
    const numFields = [
      { name: 'temperature', label: 'Temperature' },
      { name: 'feelsLike', label: 'Feels like' },
      { name: 'wind', label: 'Wind' },
      { name: 'humidity', label: 'Humidity' }
    ];
    numFields.forEach(f => {
      const val = form[f.name].trim();
      if (val !== '') {
        const num = Number(val);
        if (Number.isNaN(num)) e[f.name] = `${f.label} must be a number.`;
        else {
          if (f.name === 'humidity' && (num < 0 || num > 100)) e.humidity = 'Humidity must be between 0 and 100.';
        }
      }
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validate()) return;
    const newCard = {
      id: Date.now(),
      city: form.city.trim(),
      country: form.country.trim(),
      unit: form.unit,
      temperature: fmtTemp(form.temperature),
      feelsLike: fmtTemp(form.feelsLike),
      condition: form.condition.trim(),
      humidity: fmtHumidity(form.humidity),
      wind: fmtWind(form.wind),
      windUnit: form.windUnit,
      updatedAt: new Date().toISOString()
    };
    setCards(prev => [newCard, ...prev]);
    setForm({ city: '', country: '', unit: 'C', temperature: '', feelsLike: '', condition: '', humidity: '', wind: '', windUnit: 'km/h' });
  };

  const removeCard = id => setCards(cards.filter(c => c.id !== id));
  const clearAll = () => {
    if (cards.length === 0) return;
    if (window.confirm('Clear all weather cards? This cannot be undone.')) setCards([]);
  };

  const minutesAgo = date => {
    if (!date) return 'unknown';
    const diff = Math.floor((Date.now() - new Date(date)) / 60000);
    return diff < 1 ? 'just now' : diff === 1 ? '1 min ago' : `${diff} min ago`;
  };

  // condition -> simple inline SVG icon
  const ConditionIcon = ({ condition, size = 32 }) => {
    const c = (condition || '').toLowerCase();
    const common = {
      sun: (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="4" fill="#FFB020" />
          <g stroke="#FFB020" strokeWidth="1.5" strokeLinecap="round">
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="M4.2 4.2l1.4 1.4" />
            <path d="M18.4 18.4l1.4 1.4" />
            <path d="M4.2 19.8l1.4-1.4" />
            <path d="M18.4 5.6l1.4-1.4" />
          </g>
        </svg>
      ),
      cloud: (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 16a4 4 0 010-8 5 5 0 0110 1 3.5 3.5 0 01.2 7H5z" fill="#90A4AE" />
        </svg>
      ),
      rain: (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 16a4 4 0 010-8 5 5 0 0110 1 3.5 3.5 0 01.2 7H5z" fill="#90A4AE" />
          <g stroke="#0288D1" strokeWidth="1.6" strokeLinecap="round">
            <path d="M8 19l-.8 1.2" />
            <path d="M12 19l-.8 1.2" />
            <path d="M16 19l-.8 1.2" />
          </g>
        </svg>
      ),
      snow: (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 16a4 4 0 010-8 5 5 0 0110 1 3.5 3.5 0 01.2 7H5z" fill="#B0BEC5" />
          <g stroke="#90A4AE" strokeWidth="1.2" strokeLinecap="round">
            <path d="M8 20l0-2" />
            <path d="M8 18l2 0" />
            <path d="M14 20l0-2" />
            <path d="M14 18l2 0" />
          </g>
        </svg>
      ),
      fog: (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
          <g fill="#90A4AE">
            <rect x="4" y="10" width="16" height="2" rx="1" />
            <rect x="4" y="14" width="12" height="2" rx="1" />
            <rect x="4" y="18" width="8" height="2" rx="1" />
          </g>
        </svg>
      )
    };
    if (c.includes('rain') || c.includes('drizzle') || c.includes('shower')) return common.rain;
    if (c.includes('snow') || c.includes('sleet')) return common.snow;
    if (c.includes('cloud') || c.includes('overcast')) return common.cloud;
    if (c.includes('fog') || c.includes('haze') || c.includes('mist')) return common.fog;
    if (c.includes('sun') || c.includes('clear') || c.includes('hot')) return common.sun;
    return common.sun;
  };

  return (
    <div className="app">
      {/* Inject component-specific styles to keep project self-contained */}
      <style>{`
        .weather-wrap { max-width: 1100px; margin: 24px auto; padding: 18px; }
        .title { font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; font-size: 28px; margin: 8px 0 16px; color: #0f172a; text-align:center; }
        .weather-form { background: rgba(255,255,255,0.9); padding: 14px; border-radius: 10px; box-shadow: 0 6px 18px rgba(15,23,42,0.06); display:block; }
        .form-grid { display:grid; grid-template-columns: 1fr 1fr 120px; gap:10px; align-items:center; }
        .form-row { display:flex; gap:10px; margin-top:10px; flex-wrap:wrap; }
        .weather-form label { font-size:12px; color:#374151; display:block; margin-bottom:6px; }
        .weather-form input, .weather-form select { padding:10px 12px; border-radius:8px; border:1px solid #e6e9ef; font-size:14px; width:100%; box-sizing:border-box; }
        .actions { display:flex; gap:8px; justify-content:flex-end; margin-top:12px; }
        .btn { padding:8px 12px; border-radius:8px; cursor:pointer; border:0; font-weight:600; }
        .btn.primary { background:#7c3aed; color:white; }
        .btn.ghost { background:transparent; border:1px solid #c7c9d9; color:#0f172a; }
        .error { color:#b91c1c; font-size:12px; margin-top:6px; }

        .empty-state { margin-top:18px; padding:24px; border-radius:12px; text-align:center; background:linear-gradient(90deg,#fff,#f7f7fb); box-shadow:0 8px 30px rgba(16,24,40,0.06); color:#475569; }
        .empty-state p { margin:0 0 8px; }
        .cards-grid { margin-top:18px; display:grid; grid-template-columns: repeat(1,1fr); gap:16px; }
        @media(min-width:720px){ .cards-grid{ grid-template-columns: repeat(2,1fr); } }
        @media(min-width:1024px){ .cards-grid{ grid-template-columns: repeat(3,1fr); } }

        .card { position:relative; padding:16px; border-radius:12px; background:white; box-shadow: 0 6px 20px rgba(15,23,42,0.06); transition: transform .22s ease, box-shadow .22s ease; display:flex; flex-direction:column; gap:10px; }
        .card:hover{ transform: translateY(-6px); box-shadow: 0 14px 40px rgba(15,23,42,0.12); }
        .remove-btn{ position:absolute; right:10px; top:10px; border:0; background:transparent; font-size:18px; cursor:pointer; color:#374151; }
        .card-top{ display:flex; align-items:center; gap:12px; }
        .temp{ font-size:40px; font-weight:700; color:#0f172a; min-width:84px; text-align:center;}
        .condition{ display:flex; align-items:center; gap:8px; color:#475569; font-weight:600; text-transform:capitalize; }
        .city-info h3{ margin:0; font-size:18px; font-weight:700; color:#0f172a; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:220px; }
        .city-info span{ color:#6b7280; font-size:13px; }
        .meta{ list-style:none; padding:0; margin:0; display:flex; gap:12px; flex-wrap:wrap; color:#6b7280; font-size:13px; }
        .meta li{ background:rgba(15,23,42,0.02); padding:6px 8px; border-radius:8px; }

        @media(prefers-color-scheme:dark){
          .app{ background:linear-gradient(180deg,#071124,#071124); color:#e6eef8; }
          .weather-form, .card, .empty-state{ background: rgba(8,10,12,0.56); color:#cbd5e1; }
        }
      `}</style>

      <div className="weather-wrap">
        <h1 className="title">Weather Cards</h1>

        <form className="weather-form" onSubmit={handleSubmit} noValidate aria-label="weather-form">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 10 }}>
            <div>
              <label htmlFor="city">City *</label>
              <input id="city" name="city" placeholder="City (required)" value={form.city} onChange={handleChange} aria-required="true" />
              {errors.city && <div className="error" role="alert">{errors.city}</div>}
            </div>

            <div>
              <label htmlFor="country">Country</label>
              <input id="country" name="country" placeholder="Country code (e.g. US)" value={form.country} onChange={handleChange} />
            </div>

            <div>
              <label htmlFor="unit">Unit</label>
              <select id="unit" name="unit" value={form.unit} onChange={handleChange} aria-label="Temperature unit">
                <option value="C">°C</option>
                <option value="F">°F</option>
              </select>
            </div>
          </div>

          <div className="form-row" style={{ marginTop: 12 }}>
            <div style={{ flex: 1 }}>
              <label htmlFor="temperature">Temperature</label>
              <input id="temperature" name="temperature" placeholder="e.g. 22" value={form.temperature} onChange={handleChange} />
              {errors.temperature && <div className="error">{errors.temperature}</div>}
            </div>

            <div style={{ flex: 1 }}>
              <label htmlFor="feelsLike">Feels like</label>
              <input id="feelsLike" name="feelsLike" placeholder="e.g. 21" value={form.feelsLike} onChange={handleChange} />
              {errors.feelsLike && <div className="error">{errors.feelsLike}</div>}
            </div>

            <div style={{ flex: 1 }}>
              <label htmlFor="condition">Condition</label>
              <input id="condition" name="condition" placeholder="e.g. Rain, Clear, Haze" value={form.condition} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div style={{ width: 160 }}>
              <label htmlFor="humidity">Humidity %</label>
              <input id="humidity" name="humidity" placeholder="e.g. 40" value={form.humidity} onChange={handleChange} />
              {errors.humidity && <div className="error">{errors.humidity}</div>}
            </div>

            <div style={{ width: 160 }}>
              <label htmlFor="wind">Wind</label>
              <input id="wind" name="wind" placeholder="e.g. 12.5" value={form.wind} onChange={handleChange} />
              {errors.wind && <div className="error">{errors.wind}</div>}
            </div>

            <div style={{ width: 140 }}>
              <label htmlFor="windUnit">Wind unit</label>
              <select id="windUnit" name="windUnit" value={form.windUnit} onChange={handleChange}>
                <option value="km/h">km/h</option>
                <option value="m/s">m/s</option>
                <option value="mph">mph</option>
              </select>
            </div>
          </div>

          <div className="actions" role="group" aria-label="form-actions">
            <button type="submit" className="btn primary">Add</button>
            <button type="button" className="btn ghost" onClick={clearAll}>Clear All</button>
          </div>
        </form>

        {cards.length === 0 ? (
          <div className="empty-state" role="status" aria-live="polite" style={{ marginTop: 18 }}>
            <p><strong>No weather cards yet</strong></p>
            <p>Use the form above to enter a city and its weather details. Cards are saved locally and persist after refresh.</p>
            <p style={{ marginTop: 8, color: '#6b7280' }}>Try: "Tokyo", "Rain", 18, 80% humidity, 12 km/h wind.</p>
          </div>
        ) : (
          <div className="cards-grid" role="list" aria-label="weather-cards">
            {cards.map(card => (
              <div className="card" key={card.id} role="listitem" aria-label={`${card.city} weather card`}>
                <button className="remove-btn" aria-label={`Remove ${card.city}`} onClick={() => removeCard(card.id)}>×</button>

                <div className="card-top">
                  <div className="temp">{card.temperature !== '' ? `${card.temperature}°${card.unit}` : '--'}</div>
                  <div>
                    <div className="condition">
                      <ConditionIcon condition={card.condition} size={36} />
                      <span>{card.condition || 'Clear'}</span>
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 6 }}>{card.feelsLike !== '' ? `Feels ${card.feelsLike}°` : ''}</div>
                  </div>
                </div>

                <div className="city-info" style={{ marginTop: 4 }}>
                  <h3 title={card.city}>{card.city}</h3>
                  <span>{card.country || '—'}</span>
                </div>

                <ul className="meta" style={{ marginTop: 8 }}>
                  <li>Humidity: {card.humidity !== '' ? `${card.humidity}%` : '—'}</li>
                  <li>Wind: {card.wind !== '' ? `${card.wind} ${card.windUnit}` : '—'}</li>
                  <li>Updated: {minutesAgo(card.updatedAt)}</li>
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
