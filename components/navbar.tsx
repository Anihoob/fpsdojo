import "./components.css";

export default function Navbar() {
  return (
    <div className="nav-main">
      <div className="nav-links">
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            width="32px"
            height="32px"
            fill="#fff"
          >
            <path d="M 34.181641 2.0390625 A 1.0001 1.0001 0 0 0 33.361328 2.4824219 L 32.226562 4.1289062 A 1.0001 1.0001 0 1 0 33.873047 5.2636719 L 35.007812 3.6171875 A 1.0001 1.0001 0 0 0 34.181641 2.0390625 z M 38.492188 5.7167969 A 1.0001 1.0001 0 0 0 37.796875 6.0019531 L 36.345703 7.3789062 A 1.0002374 1.0002374 0 0 0 37.722656 8.8300781 L 39.173828 7.453125 A 1.0001 1.0001 0 0 0 38.492188 5.7167969 z M 27.023438 6 A 1.0001 1.0001 0 0 0 26.072266 7.3710938 C 26.072266 7.3710938 27.479128 11.190316 27.849609 17.347656 C 25.601612 15.15004 21.478183 12 15.5 12 C 9.7575758 12 6.4453125 14.167969 6.4453125 14.167969 A 1.0001 1.0001 0 0 0 6.4042969 15.802734 C 11.3868 19.493117 15.066962 23.784191 17.300781 29.498047 C 15.782176 29.146723 14.330626 29 13 29 C 7.8419301 29 3.4655708 31.121422 0.29296875 34.292969 A 1.0001 1.0001 0 0 0 0.75390625 35.96875 C 5.8175947 37.258842 9.2929859 41.370297 10.339844 42.669922 C 7.0094436 44.204702 5.2050781 46.394531 5.2050781 46.394531 A 1.0001 1.0001 0 0 0 6 48 C 8.8179436 48 10.679101 48.907265 11.589844 49.408203 L 9.1425781 53.486328 A 1.0001 1.0001 0 0 0 10.089844 54.996094 L 20.603516 54.041016 C 21.111811 54.42926 21.666047 54.80733 22.265625 55.158203 C 22.994703 56.398227 24.47476 57.895373 26.509766 59.273438 C 28.688641 60.748927 31.478674 62 34.5 62 C 37.539287 62 40.331178 60.749661 42.505859 59.273438 C 44.537169 57.894537 46.010413 56.394844 46.736328 55.158203 C 47.891142 54.482248 48.834209 53.710863 49.65625 53 L 58 53 A 1.0001 1.0001 0 0 0 58.832031 51.445312 L 57.386719 49.277344 L 62.554688 45.832031 A 1.0001 1.0001 0 0 0 62.554688 44.167969 L 57.779297 40.984375 C 61.931197 38.194794 63.832031 35.554688 63.832031 35.554688 A 1.0001 1.0001 0 0 0 63.275391 34.039062 C 63.275391 34.039062 58.824014 32.956171 54.380859 32.423828 C 56.14093 31.599563 57.984397 30.823383 59.533203 29.845703 A 1.0001 1.0001 0 0 0 59 28 L 52.080078 28 C 52.254536 27.818859 52.26638 27.708219 52.472656 27.533203 C 53.284653 26.844263 54.311646 26.228474 55.267578 25.962891 A 1.0001 1.0001 0 0 0 55 24 C 52.416933 24 50.670057 24.320956 49.322266 24.931641 C 48.493508 25.307151 47.866555 25.797498 47.294922 26.318359 C 47.250532 26.242589 47.250282 26.20174 47.201172 26.121094 C 46.79449 25.453279 46.230014 24.676769 45.496094 23.925781 C 44.194893 22.59432 42.23574 21.476334 39.853516 21.205078 C 39.777108 20.894392 39.675459 20.509612 39.513672 20.009766 C 39.156776 18.907126 38.570324 17.394784 37.654297 15.730469 C 35.822242 12.401838 32.653744 8.4475049 27.410156 6.0878906 A 1.0001 1.0001 0 0 0 27.023438 6 z M 28.628906 9.078125 C 32.145795 11.222116 34.480767 14.116022 35.900391 16.695312 C 36.743488 18.227123 37.287568 19.626687 37.611328 20.626953 C 37.773208 21.127086 37.880678 21.527372 37.943359 21.791016 C 37.974279 21.921088 37.994706 22.018198 38.003906 22.068359 C 38.00403 22.069034 38.003786 22.071566 38.003906 22.072266 A 1.0001 1.0001 0 0 0 38.3125 22.726562 C 38.312722 22.726772 38.783451 22.850237 39.033203 22.916016 L 39 23 C 41.166667 23 42.846747 24.076195 44.066406 25.324219 C 44.676236 25.948231 45.158635 26.609221 45.494141 27.160156 C 45.829646 27.711091 46.023864 28.220455 46.029297 28.242188 A 1.0001 1.0001 0 0 0 47.732422 28.679688 C 48.532077 27.818672 49.153479 27.204722 50.148438 26.753906 C 50.295791 26.687136 50.540398 26.651548 50.708984 26.591797 C 50.028338 27.254264 49.356728 27.917467 49.072266 28.628906 A 1.0001 1.0001 0 0 0 50 30 L 54.771484 30 C 53.404205 30.684218 52.192655 31.41887 50.615234 32.076172 A 1.0001 1.0001 0 0 0 51 34 C 54.836697 34 59.29767 35.101581 61.175781 35.589844 C 60.286012 36.623573 58.756314 38.180587 55.486328 40.142578 A 1.0001 1.0001 0 0 0 55.445312 41.832031 L 60.197266 45 L 55.445312 48.167969 A 1.0001 1.0001 0 0 0 55.167969 49.554688 L 56.130859 51 L 51.640625 51 C 53.228107 48.948861 53.971468 46.453342 53.982422 43.945312 C 54.016722 43.5422 53.934942 43.259902 53.802734 42.974609 C 53.66494 42.677251 53.519752 42.316608 52.921875 42.111328 C 52.545599 41.982816 52.223934 41.981289 51.894531 42.015625 C 51.565129 42.049955 51.242582 42.112785 50.882812 42.349609 L 50.914062 42.328125 L 50.535156 42.558594 C 48.961583 43.257054 47.791702 43.701351 46 43.849609 L 46 42.763672 A 1.0001 1.0001 0 0 0 46 42.474609 L 46 36 A 1.0001 1.0001 0 0 0 44.292969 35.292969 C 44.292969 35.292969 41.896808 37.541481 39.509766 39.490234 C 39.754163 37.934354 40 35.853726 40 33 A 1.0001 1.0001 0 0 0 38.470703 32.152344 C 34.398409 34.697528 31.021548 37.778989 29.564453 39.142578 C 29.051435 37.223379 29 35.038794 29 33 A 1.0001 1.0001 0 0 0 27.970703 32 A 1.0001 1.0001 0 0 0 27.400391 32.199219 C 27.400391 32.199219 23 35.466667 23 41 L 23 42.460938 A 1.0001 1.0001 0 0 0 23 42.769531 L 23 45.261719 L 20.994141 44.095703 A 1.0001 1.0001 0 0 0 20.976562 44.083984 A 1.0001 1.0001 0 0 0 20.925781 44.050781 L 18.115234 42.347656 C 17.755467 42.110831 17.434871 42.049958 17.105469 42.015625 C 16.776066 41.981295 16.454401 41.982818 16.078125 42.111328 A 1.0001 1.0001 0 0 0 16.074219 42.111328 C 15.475779 42.317687 15.334701 42.676074 15.197266 42.972656 C 15.065169 43.257718 14.982331 43.538667 15.015625 43.941406 C 15.028426 46.977398 16.104863 49.998521 18.470703 52.226562 L 11.871094 52.826172 L 13.857422 49.513672 A 1.0001 1.0001 0 0 0 13.554688 48.167969 C 13.554688 48.167969 11.340451 46.770555 8.1777344 46.244141 C 9.0943354 45.491227 10.469427 44.582898 12.324219 43.945312 A 1.0001 1.0001 0 0 0 12.810547 42.414062 C 12.810547 42.414062 8.796177 37.028448 2.8691406 34.736328 C 5.569571 32.478457 8.9652022 31 13 31 C 14.920014 31 16.61407 31.02488 18.589844 31.912109 A 1.0001 1.0001 0 0 0 19.953125 30.699219 C 17.880347 24.116219 13.939766 19.291096 8.8457031 15.240234 C 10.011976 14.697836 11.938208 14 15.5 14 C 23.45098 14 28.185547 20.582031 28.185547 20.582031 A 1.0001 1.0001 0 0 0 30 20 C 30 14.593733 29.242601 11.237702 28.628906 9.078125 z M 41.951172 10.181641 A 1.0001 1.0001 0 0 0 41.414062 10.34375 L 39.720703 11.412109 A 1.000281 1.000281 0 1 0 40.789062 13.103516 L 42.480469 12.035156 A 1.0001 1.0001 0 0 0 41.951172 10.181641 z M 44.503906 15.222656 A 1.0001 1.0001 0 0 0 44.142578 15.292969 L 42.275391 16.011719 A 1.0003735 1.0003735 0 0 0 42.994141 17.878906 L 44.861328 17.160156 A 1.0001 1.0001 0 0 0 44.503906 15.222656 z M 37.847656 35.115234 C 37.63226 39.222203 37.050781 41.683594 37.050781 41.683594 A 1.0001 1.0001 0 0 0 38.554688 42.832031 C 40.591552 41.474121 42.564342 39.687602 44 38.330078 L 44 42.033203 C 42.31592 42.939221 39.715773 44.578646 37.425781 46.181641 A 1.0001 1.0001 0 1 0 38.574219 47.818359 C 38.726715 47.711612 38.892585 47.603705 39.048828 47.496094 A 1.5 2 0 0 0 40.5 49 A 1.5 2 0 0 0 42 47 A 1.5 2 0 0 0 41.673828 45.757812 C 42.509496 45.224628 43.31144 44.727765 44 44.324219 L 44 45 A 1.0001 1.0001 0 0 0 45 46 C 45.756945 46 46.41057 45.944481 47.013672 45.857422 C 47.011602 45.90461 47 45.953789 47 46 C 47 47.073631 46.90182 50.890664 45.134766 53.935547 A 1.0001 1.0001 0 0 0 45.111328 53.978516 C 44.772906 54.63404 43.328131 56.296659 41.382812 57.617188 C 39.437494 58.937714 36.980713 60 34.5 60 C 32.041326 60 29.581984 58.938448 27.630859 57.617188 C 25.679735 56.295927 24.224601 54.629211 23.888672 53.978516 L 23.886719 53.978516 A 1.0001 1.0001 0 0 0 23.865234 53.935547 C 22.452004 51.500363 22.116968 48.638259 22.035156 47.013672 L 23.498047 47.865234 A 1.0001 1.0001 0 0 0 25 47 L 25 44.324219 C 25.687937 44.7274 26.48937 45.223231 27.324219 45.755859 A 1.5 2 0 0 0 27 47 A 1.5 2 0 0 0 28.5 49 A 1.5 2 0 0 0 29.951172 47.496094 C 30.107415 47.603705 30.273285 47.711612 30.425781 47.818359 A 1.0001 1.0001 0 1 0 31.574219 46.181641 C 29.284227 44.578646 26.68408 42.939221 25 42.033203 L 25 41 C 25 38.499497 26.02238 36.732777 27.015625 35.494141 C 27.018825 37.432991 27.130957 39.498243 28.105469 41.447266 A 1.0001 1.0001 0 0 0 29.697266 41.716797 C 29.697266 41.716797 33.673941 38.054224 37.847656 35.115234 z M 17.035156 44.105469 L 19.826172 45.728516 C 19.92375 45.820519 19.997895 45.891723 20 45.884766 C 19.99987 45.899555 20 45.915281 20 46 C 20 46.79025 20.06263 49.026674 20.753906 51.509766 C 20.540987 51.32707 20.254097 51.15957 20.054688 50.984375 C 18.005598 49.185196 17.085825 46.7152 17.035156 44.105469 z M 51.960938 44.119141 C 51.90771 46.723507 50.989537 49.188834 48.943359 50.986328 C 48.744642 51.160891 48.458326 51.32766 48.246094 51.509766 C 48.937376 49.026674 49 46.79025 49 46 C 49 45.915281 49.00011 45.899584 49 45.884766 C 49.002163 45.8922 49.080265 45.815266 49.1875 45.714844 L 51.351562 44.402344 C 51.550822 44.309044 51.752296 44.215696 51.960938 44.119141 z M 37.037109 52.988281 A 1.0001 1.0001 0 0 0 36.199219 53.400391 C 36.199219 53.400391 36.1526 53.482411 35.882812 53.648438 C 35.613023 53.814462 35.184524 54 34.5 54 C 33.815476 54 33.386977 53.814462 33.117188 53.648438 C 32.847397 53.482413 32.800781 53.400391 32.800781 53.400391 A 1.0003905 1.0003905 0 1 0 31.199219 54.599609 C 31.199219 54.599609 31.527603 55.017589 32.070312 55.351562 C 32.613023 55.685538 33.434524 56 34.5 56 C 35.565476 56 36.386977 55.685538 36.929688 55.351562 C 37.472397 55.017587 37.800781 54.599609 37.800781 54.599609 A 1.0001 1.0001 0 0 0 37.037109 52.988281 z" />
          </svg>
          <h6>ANIME</h6>
        </li>
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            width="30px"
            height="30px"
            fill="#fff"
          >
            <path d="M 8.9628906 0 A 1.0001 1.0001 0 0 0 8.0058594 1.0996094 L 8.9824219 10.871094 C 8.8694245 11.161751 8.700801 11.648339 8.5195312 12.554688 C 8.2544455 13.880116 8 15.944444 8 19 C 8 23.06572 8.9768882 26.067153 9.0253906 26.214844 C 8.9982766 26.449895 8.8730449 27.277547 9.1347656 29.138672 C 9.4295288 31.234766 10.175692 34.324294 11.958984 38.400391 C 15.662022 46.864182 21.548828 49.892578 21.548828 49.892578 A 1.0001 1.0001 0 0 0 22 50 L 28 50 A 1.0001 1.0001 0 0 0 28.451172 49.892578 C 28.451172 49.892578 34.337978 46.864182 38.041016 38.400391 C 39.824308 34.324294 40.570471 31.234766 40.865234 29.138672 C 41.126955 27.277547 41.001723 26.449895 40.974609 26.214844 C 41.023112 26.067153 42 23.06572 42 19 C 42 15.944444 41.745555 13.880116 41.480469 12.554688 C 41.299199 11.648338 41.130576 11.161751 41.017578 10.871094 L 41.994141 1.0996094 A 1.0001 1.0001 0 0 0 40.552734 0.10546875 L 34.917969 2.9238281 C 34.273153 2.6668118 30.073004 1.0434975 25.130859 1.0117188 A 1.0001 1.0001 0 0 0 25 1 C 20.006261 1 15.732745 2.6644611 15.082031 2.9238281 L 9.4472656 0.10546875 A 1.0001 1.0001 0 0 0 8.9628906 0 z M 10.173828 2.7050781 L 12.746094 3.9921875 C 12.642731 4.0548976 12.445313 4.1679688 12.445312 4.1679688 A 1.0001 1.0001 0 0 0 12 5 C 12 5 12.006341 8.3561746 12.472656 13.708984 L 10.976562 10.716797 L 10.173828 2.7050781 z M 39.826172 2.7050781 L 39.023438 10.716797 L 37.527344 13.708984 C 37.993654 8.3561746 38 5 38 5 A 1.0001 1.0001 0 0 0 37.554688 4.1679688 C 37.554688 4.1679688 37.357269 4.0548976 37.253906 3.9921875 L 39.826172 2.7050781 z M 24 3.0449219 L 24 12 A 1.0001 1.0001 0 1 0 26 12 L 26 3.0449219 C 28.247986 3.1601916 30.343035 3.6084807 31.935547 4.0546875 L 31.027344 15.603516 L 26.232422 21.359375 A 1.0001 1.0001 0 0 0 26 22 L 26 24 L 26 28.058594 C 25.743851 28.046954 25.500443 28.030949 25.220703 28.027344 A 1.0001 1.0001 0 0 0 25 28 C 24.635703 28 24.321172 28.016638 24 28.03125 L 24 24 L 24 22 A 1.0001 1.0001 0 0 0 23.767578 21.359375 L 18.972656 15.603516 L 18.064453 4.0546875 C 19.656965 3.6084806 21.752014 3.1601916 24 3.0449219 z M 16.107422 4.6582031 L 17.003906 16.078125 A 1.0001 1.0001 0 0 0 17.232422 16.640625 L 21.904297 22.246094 L 14.966797 18.392578 C 14.083002 11.004671 14.025218 6.3758222 14.019531 5.5996094 C 14.261199 5.4527997 14.50477 5.2742639 15.371094 4.9277344 A 1.0001 1.0001 0 0 0 15.378906 4.9257812 C 15.378906 4.9257813 15.687561 4.8064948 16.107422 4.6582031 z M 33.892578 4.6582031 C 34.312439 4.8064948 34.621094 4.9257812 34.621094 4.9257812 A 1.0001 1.0001 0 0 0 34.636719 4.9316406 C 35.493847 5.2751957 35.739857 5.4534414 35.980469 5.5996094 C 35.974736 6.3758222 35.916996 11.004671 35.033203 18.392578 L 28.095703 22.246094 L 32.767578 16.640625 A 1.0001 1.0001 0 0 0 32.996094 16.078125 L 33.892578 4.6582031 z M 10.322266 13.880859 L 13.105469 19.447266 A 1.0001 1.0001 0 0 0 13.513672 19.875 L 22 24.587891 L 22 27.855469 L 13.486328 23.125 A 1.0001 1.0001 0 0 0 13 23 L 10.335938 23 C 10.153301 21.899884 10 20.535772 10 19 C 10 16.725882 10.147345 15.065593 10.322266 13.880859 z M 39.677734 13.880859 C 39.852655 15.065593 40 16.725882 40 19 C 40 20.535772 39.846699 21.899884 39.664062 23 L 37 23 A 1.0001 1.0001 0 0 0 36.513672 23.125 L 28 27.855469 L 28 24.587891 L 36.486328 19.875 A 1.0001 1.0001 0 0 0 36.894531 19.447266 L 39.677734 13.880859 z M 11.869141 25 L 12.740234 25 L 19.8125 28.929688 C 19.779713 28.948044 19.734556 28.968642 19.705078 28.986328 C 19.695391 28.99214 19.697044 28.99406 19.6875 29 L 14.535156 29 L 11.869141 25 z M 37.259766 25 L 38.130859 25 L 35.464844 29 L 30.3125 29 C 30.302956 28.99406 30.304609 28.99214 30.294922 28.986328 C 30.265444 28.968642 30.220287 28.948044 30.1875 28.929688 L 37.259766 25 z M 10.96875 27.255859 L 13.167969 30.554688 A 1.0001 1.0001 0 0 0 14 31 L 19.279297 31 L 21.050781 36.316406 A 1.0001 1.0001 0 0 0 22.707031 36.707031 C 22.707031 36.707031 22.816523 36.584903 23.197266 36.394531 C 23.578009 36.20416 24.166667 36 25 36 C 25.833333 36 26.421991 36.20416 26.802734 36.394531 C 27.183477 36.584903 27.292969 36.707031 27.292969 36.707031 A 1.0001 1.0001 0 0 0 28.949219 36.316406 L 30.720703 31 L 36 31 A 1.0001 1.0001 0 0 0 36.832031 30.554688 L 39.03125 27.255859 C 39.015396 27.670916 38.981827 28.171115 38.884766 28.861328 C 38.811605 29.381581 38.697526 29.993352 38.548828 30.664062 C 38.480879 30.801685 38.087637 31.590331 37.511719 32.439453 C 37.197808 32.902278 36.841934 33.352824 36.529297 33.644531 C 36.216659 33.936239 35.969951 34 36 34 L 34 34 A 1.0001 1.0001 0 0 0 33.105469 34.552734 L 30.105469 40.552734 A 1.0001 1.0001 0 0 0 30.292969 41.707031 L 32.429688 43.84375 C 30.006654 46.788307 27.845473 47.921135 27.691406 48 L 22.308594 48 C 22.154527 47.921135 19.993346 46.788307 17.570312 43.84375 L 19.707031 41.707031 A 1.0001 1.0001 0 0 0 19.894531 40.552734 L 16.894531 34.552734 A 1.0001 1.0001 0 0 0 16 34 L 14 34 C 14.03005 34 13.783341 33.93624 13.470703 33.644531 C 13.158066 33.352824 12.802192 32.902278 12.488281 32.439453 C 11.912363 31.590331 11.519121 30.801685 11.451172 30.664062 C 11.302474 29.993351 11.188395 29.381581 11.115234 28.861328 C 11.018173 28.171115 10.984604 27.670916 10.96875 27.255859 z M 25 30 C 26.916667 30 28.060085 30.241382 28.683594 30.449219 C 28.735894 30.466649 28.73607 30.475397 28.78125 30.492188 L 27.429688 34.544922 C 26.819997 34.270971 26.050885 34 25 34 C 23.949115 34 23.179999 34.270972 22.570312 34.544922 L 21.21875 30.492188 C 21.26393 30.475397 21.264106 30.466649 21.316406 30.449219 C 21.939911 30.241383 23.083333 30 25 30 z M 13.058594 35.775391 C 13.33795 35.906947 13.643719 36 14 36 L 15.382812 36 L 17.783203 40.802734 L 16.355469 42.230469 C 15.470799 40.947971 14.58859 39.422573 13.791016 37.599609 C 13.506716 36.949782 13.289383 36.369661 13.058594 35.775391 z M 36.941406 35.775391 C 36.710617 36.369661 36.493284 36.949782 36.208984 37.599609 C 35.41141 39.422573 34.529201 40.947971 33.644531 42.230469 L 32.216797 40.802734 L 34.617188 36 L 36 36 C 36.356281 36 36.66205 35.906947 36.941406 35.775391 z" />
          </svg>
          <h6>MOVIES</h6>
        </li>
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 256 256"
          >
            <path
              fill="currentColor"
              d="m229.66 218.34l-50.07-50.06a88.11 88.11 0 1 0-11.31 11.31l50.06 50.07a8 8 0 0 0 11.32-11.32ZM40 112a72 72 0 1 1 72 72a72.08 72.08 0 0 1-72-72Z"
            />
          </svg>
          <h6>SEARCH</h6>
        </li>
        <li>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 20 20"><path fill="currentColor" d="M6.17 4.276A.5.5 0 0 1 6.619 4h6.764a.5.5 0 0 1 .447.276l1.224 2.448a.5.5 0 1 0 .894-.448L14.724 3.83A1.5 1.5 0 0 0 13.382 3H6.618a1.5 1.5 0 0 0-1.342.83L4.053 6.275a.5.5 0 0 0 .894.448l1.224-2.448Zm11.248 4.717c-5.946-.99-8.89-.99-14.836 0a.5.5 0 0 1-.164-.986c6.054-1.01 9.11-1.01 15.164 0a.5.5 0 1 1-.164.986ZM5.5 11a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5ZM2 13.5a3.5 3.5 0 0 1 6.965-.5h2.07a3.5 3.5 0 1 1 0 1h-2.07A3.5 3.5 0 0 1 2 13.5ZM14.5 11a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5Z"/></svg>
          <h6>TEAM</h6>
        </li>
      </div>
    </div>
  );
}
