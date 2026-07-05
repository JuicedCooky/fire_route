import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import heroImg from '../assets/hero.png'

export default function Home() {
  return (
    <div className="layout-wrap">
      <video className="bg-video" autoPlay loop muted playsInline>
        <source src={`${import.meta.env.BASE_URL}videos/72_Fire_Rte_98_-3153265.mp4`} type="video/mp4" />
      </video>

      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>72 Fire Rte 98</h1>
          <p>Located near Pigeon Lake, Trent Lakes, ON.</p>
        </div>
      </section>

      {/* <div className="ticks"></div> */}

      <section id="floating-boxes">
        <div className="box">
          <svg className="box-icon" role="presentation" aria-hidden="true" viewBox="0 -31.5 1087 1087" fill="var(--accent)" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
            <path d="M665.579712 1024c-151.483292 0-290.523313-52.47814-372.080835-140.527803-50.855105-54.912693-75.200634-118.616827-70.196275-184.349756s42.198917-113.477216 90.21371-167.98415c33.272223-37.600317 40.575882-62.892617 36.7888-73.983358-5.004359-13.525294-31.919694-24.480782-46.797517-27.050587-104.550522-0.811518-195.169991-34.354246-243.45529-90.213711a131.060098 131.060098 0 0 1-33.13697-107.390833C42.063664 134.982433 170.959715 61.404834 326.635847 61.404834c158.78695 0 279.703078 76.012152 281.326113 176.640338a139.986792 139.986792 0 0 1-37.329811 97.787875c-29.349888 32.190199-33.948488 54.101176-31.513935 59.105534 0 0 10.955488 23.398758 106.579316 26.103818 230.741514 6.627394 415.497028 122.539163 439.166292 275.510236a228.442214 228.442214 0 0 1-57.482499 187.32532c-75.200634 87.508651-210.588826 140.122045-361.801611 140.122045z m-338.132347-881.984414c-120.10461 0-212.076608 54.101176-219.51552 102.386474a51.125611 51.125611 0 0 0 14.472065 42.198917c31.784441 37.600317 104.415269 61.945846 184.079249 61.945846h6.356889c9.1972 1.487782 89.943204 15.959847 113.206709 81.151764 16.230353 45.174482-1.352529 97.382116-52.342887 155.135121-40.575882 45.715493-67.626469 78.852463-70.196275 120.375115a165.143838 165.143838 0 0 0 48.826311 122.944922c66.544446 71.684058 183.402985 114.559239 312.569541 114.559239s240.344472-42.063664 300.667283-112.395192a151.348039 151.348039 0 0 0 38.952847-121.727645C987.075948 596.059701 831.805574 507.198521 643.127724 501.788403c-100.087175-2.840312-158.651697-27.050588-178.939638-75.606393-17.718135-41.657905-1.487782-93.054022 45.580241-144.585391a59.240787 59.240787 0 0 0 16.771364-42.604676c-0.135253-45.985999-82.504293-96.976357-199.498085-96.976357zM875.762779 154.323603L810.706115 0l-57.482499 154.323603h41.116894V202.879408h40.440629v-48.555805h40.98164zM1029.139612 377.490952l-89.537446-212.211861-78.987716 212.211861h56.400475v66.814952h55.588958v-66.814952h56.535729zM168.525162 675.58843L79.122969 463.511821 0 675.58843h56.535728v66.950204h55.453705v-66.950204h56.535729zM238.450931 945.959054l-72.630828-172.176991-64.109893 172.176991h45.850746v54.101176h45.039229v-54.101176h45.850746zM753.223616 319.196936L693.847576 178.263373 641.234183 319.196936h37.600317v44.498217h36.788799V319.196936h37.600317zM698.716682 899.973055a33.813235 33.813235 0 1 1 0-67.626469c102.521728 0 192.464932-49.773081 192.464932-106.444063a65.462422 65.462422 0 0 0-15.959847-40.575882 33.82676 33.82676 0 1 1 52.883899-42.198917 133.088892 133.088892 0 0 1 30.702417 83.180558c-0.135253 97.11161-114.288733 173.664773-260.091401 173.664773z" />
          </svg>
          <h3>Lake Side</h3>
          <p>Located near Pigeon Lake.</p>
        </div>

        <div className="box">
          <svg className="box-icon" role="presentation" aria-hidden="true" viewBox="0 0 24 24" fill="var(--accent)" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 5V19M3 16H21M21 19V13.2C21 12.0799 21 11.5198 20.782 11.092C20.5903 10.7157 20.2843 10.4097 19.908 10.218C19.4802 10 18.9201 10 17.8 10H11V15.7273M7 12H7.01M8 12C8 12.5523 7.55228 13 7 13C6.44772 13 6 12.5523 6 12C6 11.4477 6.44772 11 7 11C7.55228 11 8 11.4477 8 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <h3>Live Alerts</h3>
          <p>Instant notifications for hazard updates, evacuations, and route changes.</p>
        </div>

        <div className="box">
          <svg className="box-icon" role="presentation" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
          </svg>
          <h3>Fast Response</h3>
          <p>Calculated escape paths in seconds so every second counts when it matters.</p>
        </div>
      </section>

      {/* <div className="ticks"></div> */}

      <section id="next-steps">
        {/* <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank" rel="noreferrer">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank" rel="noreferrer">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div> */}
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank" rel="noreferrer">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank" rel="noreferrer">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank" rel="noreferrer">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank" rel="noreferrer">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* <div className="ticks"></div> */}
      {/* <section id="spacer"></section> */}
    </div>
  )
}
