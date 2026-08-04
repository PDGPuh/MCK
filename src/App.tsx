import { useState } from 'react';

type Screen = 'home' | 'search' | 'library' | 'player';

const tracks = [
  ['Chìm Sâu','track_chim_sau.jpg'],
  ['Tại Vì Sao','track_tai_vi_sao.jpg'],
  ['Ngày Hôm Qua','track_ngay_hom_qua.jpg'],
  ['Blue Tequila','track_blue_tequila.jpg'],
  ['Losing You','track_losing_you.jpg'],
];

const nav = [
  ['home','⌂','Home'],
  ['search','⌕','Search'],
  ['library','▥','Library'],
] as const;

function Header({title='MCK'}:{title?:string}) {
  return <header className="top-header">
    <h1 className="wordmark">{title}</h1>
    <div className="header-actions">
      <img className="avatar" src="/assets/avatar_mck_placeholder.jpg" alt="" />
      <button className="icon-button" aria-label="Notifications">♧<i /></button>
    </div>
  </header>;
}

function TrackList({openPlayer}:{openPlayer:()=>void}) {
  return <div className="track-list">{tracks.map(([title,img]) =>
    <button className="track-row" key={title} onClick={openPlayer}>
      <img src={`/assets/${img}`} alt="" />
      <span className="track-copy"><strong>{title} <em>E</em></strong><small>MCK · HVL</small></span>
      <span className="row-actions">▶　•••</span>
    </button>
  )}</div>;
}

function BottomNav({screen,setScreen}:{screen:Screen,setScreen:(s:Screen)=>void}) {
  return <nav className="bottom-nav">
    {nav.map(([id,icon,label]) => <button key={id} className={screen===id?'active':''} onClick={()=>setScreen(id)}>
      <span>{icon}</span><small>{label}</small>
    </button>)}
    <button onClick={()=>alert('Settings\\nAbout\\nShare App')}><span>•••</span><small>More</small></button>
  </nav>;
}

function Home({openPlayer}:{openPlayer:()=>void}) {
  return <main className="screen">
    <Header />
    <div className="mood-chip">⌁　HVL mood</div>
    <section className="hero home-hero">
      <img src="/assets/hero_home_hvl.jpg" alt="" />
      <div className="hero-overlay" />
      <div className="hero-copy"><h2>HVL</h2><p>Dark soul essentials</p>
        <div><button className="primary" onClick={openPlayer}>▶　Play</button><button className="round">＋</button></div>
      </div>
    </section>
    <div className="section-title"><h3>From HVL</h3><span>See all ›</span></div>
    <TrackList openPlayer={openPlayer}/>
  </main>;
}

function Search() {
  const [category,setCategory] = useState('Dark Soul');
  const categories=['Rap','Dark Soul','Chill','Love','Live','Sad','Vietnamese'];
  const playlists=[
    ['Dark Soul Nights','playlist_dark_soul_nights.jpg'],
    ['Midnight Drive','playlist_midnight_drive.jpg'],
    ['Sai Gon Vibes','playlist_sai_gon_vibes.jpg'],
    ['Late Night Thoughts','playlist_late_night_thoughts.jpg'],
  ];
  return <main className="screen"><Header/>
    <div className="search-field">⌕　Search music, artists, playlists... <span>▥</span></div>
    <div className="chips">{categories.map(c=><button onClick={()=>setCategory(c)} className={category===c?'selected':''} key={c}>{c}</button>)}</div>
    <section className="hero search-hero"><img src="/assets/hero_search_hvl_selection.jpg" alt=""/><div className="hero-overlay"/>
      <div className="hero-copy"><small>FEATURED PLAYLIST</small><h2>HVL<br/>SELECTION</h2><p>The finest cuts from<br/>the dark soul era.</p><button className="primary">▶　Play</button></div>
    </section>
    <div className="section-title"><h3>Trending Playlists</h3><span>See all ›</span></div>
    <div className="horizontal-cards">{playlists.map(([t,img])=><article key={t}><img src={`/assets/${img}`} alt=""/><strong>{t}</strong><small>20K+ followers</small></article>)}</div>
    <div className="section-title"><h3>Top Artists</h3><span>See all ›</span></div>
    <div className="artists">{['MCK','tlinh','16 Typh','VSTRA','RONBOOGZ'].map((a,i)=><div key={a}><span>{i+1}</span><small>{a}</small></div>)}</div>
  </main>;
}

function Library({openPlayer}:{openPlayer:()=>void}) {
  const playlists=[
    ['HVL Essentials','playlist_hvl_essentials.jpg'],
    ['Dark Soul','playlist_dark_soul.jpg'],
    ['MCK Best Of','playlist_mck_best_of.jpg'],
    ['Blue Tequila','playlist_blue_tequila.jpg'],
  ];
  return <main className="screen"><Header title="LIBRARY"/><div className="mood-chip">♩　MCK · HVL</div>
    <section className="collection"><img src="/assets/library_collection_banner.jpg" alt=""/><div><h2>HVL Collection</h2><p>The official archive of MCK — HVL era.<br/>Dark. Deep. Timeless.</p><div className="stats"><b>24<small>Playlists</small></b><b>312<small>Liked Songs</small></b><b>18<small>Downloads</small></b></div></div></section>
    <div className="section-title"><h3>Your Playlists</h3><span>See all ›</span></div>
    <div className="horizontal-cards">{playlists.map(([t,img])=><article key={t}><img src={`/assets/${img}`} alt=""/><strong>{t}</strong><small>Playlist</small></article>)}</div>
    <div className="section-title"><h3>Recently Played</h3><span>See all ›</span></div>
    <TrackList openPlayer={openPlayer}/>
  </main>;
}

function Player({close}:{close:()=>void}) {
  const [playing,setPlaying]=useState(true);
  const [liked,setLiked]=useState(false);
  return <main className="screen player-screen">
    <div className="player-header"><button onClick={close}>⌄</button><div><small>NOW PLAYING</small><h1>HVL</h1></div><button>•••</button></div>
    <img className="player-art" src="/assets/album_chim_sau.jpg" alt=""/>
    <div className="player-title"><div><h2>Chìm Sâu <em>E</em></h2><p>MCK</p></div><button onClick={()=>setLiked(!liked)}>{liked?'♥':'♡'}</button></div>
    <input className="progress" type="range" min="0" max="100" defaultValue="38"/>
    <div className="times"><span>1:18</span><span>3:24</span></div>
    <div className="controls"><button>⇄</button><button>◀</button><button className="big" onClick={()=>setPlaying(!playing)}>{playing?'Ⅱ':'▶'}</button><button>▶</button><button>↻</button></div>
    <div className="info-grid"><div><b>❝ Lyrics</b><p>Chìm sâu vào<br/>bóng tối...</p></div><div><b>☷ Up next</b><p>Tại Vì Sao<br/><small>MCK</small></p></div><div><b>◉ Output</b><p>Beats Studio³<br/><small>Connected</small></p></div></div>
  </main>;
}

export default function App() {
  const [screen,setScreen]=useState<Screen>('home');
  return <div className="app-shell">
    {screen==='home' && <Home openPlayer={()=>setScreen('player')}/>}
    {screen==='search' && <Search/>}
    {screen==='library' && <Library openPlayer={()=>setScreen('player')}/>}
    {screen==='player' && <Player close={()=>setScreen('home')}/>}
    {screen!=='player' && <BottomNav screen={screen} setScreen={setScreen}/>}
    <div className="grain"/><div className="vignette"/>
  </div>;
}
