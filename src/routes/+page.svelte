<script>
  import { onMount } from 'svelte';

  
  
  onMount(() => {
    // Animasi untuk elemen-elemen dekorasi ikan
    const fishes = document.querySelectorAll('.fish-decoration');
    fishes.forEach((fish, index) => {
      fish.style.animationDelay = `${index * 2}s`;
    });
  });
</script>

<svelte:head>
  <title>ForumIkan - Komunitas Pecinta Ikan Indonesia</title>
  <meta name="description" content="Bergabunglah dengan komunitas pecinta ikan terbesar di Indonesia. Berbagi pengetahuan, pengalaman, dan passion tentang dunia perikanan.">
</svelte:head>

<!-- Hero Section -->
<section class="welcome-hero text-center text-white">
  <div class="fish-decoration fish-1">🐠</div>
  <div class="fish-decoration fish-2">🐟</div>
  <div class="fish-decoration fish-3">🐡</div>
  
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <h1 class="display-4 fw-bold mb-4">Selamat Datang di ForumIkan</h1>
        <p class="lead mb-5">Bergabunglah dengan komunitas pecinta ikan terbesar di Indonesia. Berbagi pengetahuan, pengalaman, dan passion tentang dunia perikanan.</p>
        <div class="d-flex flex-column flex-sm-row justify-content-center gap-3">
          <a href="/register" class="btn btn-fish btn-lg">
            <i class="fas fa-user-plus me-2"></i>Daftar Sekarang
          </a>
          <a href="/forum" class="btn btn-outline-light btn-lg">
            <i class="fas fa-comments me-2"></i>Jelajahi Forum
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Features Section -->
<section class="py-5">
  <div class="container">
    <div class="row text-center mb-5">
      <div class="col-lg-8 mx-auto">
        <h2 class="fw-bold mb-3">Mengapa Bergabung dengan ForumIkan?</h2>
        <p class="text-muted">Temukan semua yang Anda butuhkan tentang dunia perikanan dalam satu platform</p>
      </div>
    </div>
    
    <div class="row g-4">
      <div class="col-md-4">
        <div class="card card-fish h-100 text-center p-4">
          <div class="feature-icon">
            <i class="fas fa-users"></i>
          </div>
          <h4>Komunitas Aktif</h4>
          <p class="text-muted">Bergabung dengan ribuan pecinta ikan dari seluruh Indonesia yang siap berbagi pengalaman.</p>
        </div>
      </div>
      
      <div class="col-md-4">
        <div class="card card-fish h-100 text-center p-4">
          <div class="feature-icon">
            <i class="fas fa-graduation-cap"></i>
          </div>
          <h4>Belajar Bersama</h4>
          <p class="text-muted">Dapatkan jawaban untuk semua pertanyaan Anda tentang perawatan, budidaya, dan bisnis ikan.</p>
        </div>
      </div>
      
      <div class="col-md-4">
        <div class="card card-fish h-100 text-center p-4">
          <div class="feature-icon">
            <i class="fas fa-handshake"></i>
          </div>
          <h4>Jaringan Bisnis</h4>
          <p class="text-muted">Perluas jaringan bisnis Anda dengan bertemu pembudidaya, supplier, dan konsumen.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Stats Section -->
<section class="py-5 fish-theme text-white">
  <div class="container">
    <div class="row text-center">
      <div class="col-md-3 mb-4">
        <h2 class="fw-bold display-4">5K+</h2>
        <p class="mb-0">Anggota Komunitas</p>
      </div>
      <div class="col-md-3 mb-4">
        <h2 class="fw-bold display-4">20K+</h2>
        <p class="mb-0">Postingan Diskusi</p>
      </div>
      <div class="col-md-3 mb-4">
        <h2 class="fw-bold display-4">50+</h2>
        <p class="mb-0">Ahli Perikanan</p>
      </div>
      <div class="col-md-3 mb-4">
        <h2 class="fw-bold display-4">100+</h2>
        <p class="mb-0">Jenis Ikan</p>
      </div>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="py-5">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-8 text-center">
        <h2 class="fw-bold mb-4">Siap Bergabung dengan Komunitas Kami?</h2>
        <p class="lead text-muted mb-4">Daftar sekarang dan mulai berbagi passion Anda tentang dunia ikan dengan komunitas yang supportive.</p>
        <a href="/register" class="btn btn-fish btn-lg px-5">
          <i class="fas fa-user-plus me-2"></i>Mulai Sekarang
        </a>
      </div>
    </div>
  </div>
</section>