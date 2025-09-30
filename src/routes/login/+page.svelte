<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let formData = {
    email: '',
    password: ''
  };
  
  let isLoading = false;
  let errors = {};
  let showPassword = false;
  let rememberMe = false;

  // Mock users data
  const mockUsers = [
    { id: 1, email: 'user@example.com', password: 'password123', username: 'ikanlover' },
    { id: 2, email: 'budidaya@example.com', password: 'password123', username: 'budidayaman' },
    { id: 3, email: 'hias@example.com', password: 'password123', username: 'hiasindah' }
  ];

  const validateForm = () => {
    errors = {};
    
    if (!formData.email) {
      errors.email = 'Email wajib diisi';
    }
    
    if (!formData.password) {
      errors.password = 'Password wajib diisi';
    }
    
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    isLoading = true;
    
    // Mock authentication - simulasikan delay network
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Cari user di mock data
    const user = mockUsers.find(u => 
      u.email === formData.email && u.password === formData.password
    );
    
    if (user) {
      // Mock successful login
      const userData = {
        id: user.id,
        username: user.username,
        email: user.email,
        created_at: new Date().toISOString()
      };
      
      // Simpan ke localStorage
      localStorage.setItem('forumIkanUser', JSON.stringify(userData));
      
      if (rememberMe) {
        localStorage.setItem('forumIkanRemember', 'true');
      }
      
      // Show success message
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      
      Toast.fire({
        icon: "success",
        title: "Login berhasil!"
      });
      
      // Redirect ke halaman utama
      setTimeout(() => {
        goto('/');
      }, 2000);
      
    } else {
      errors.general = 'Email atau password salah';
      isLoading = false;
    }
  };

  const togglePasswordVisibility = () => {
    showPassword = !showPassword;
  };

  const fillDemoAccount = (email, password) => {
    formData.email = email;
    formData.password = password;
    rememberMe = true;
  };
</script>

<svelte:head>
  <title>ForumIkan - Login</title>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</svelte:head>

<div class="container py-5">
  <div class="row justify-content-center">
    <div class="col-md-6 col-lg-5">
      <!-- Header -->
      <div class="text-center mb-5">
        <a href="/" class="text-decoration-none">
          <h2 class="fw-bold text-primary">
            <i class="fas fa-fish me-2"></i>ForumIkan
          </h2>
        </a>
        <p class="text-muted">Masuk ke akun Anda</p>
      </div>

      <!-- Login Card -->
      <div class="card shadow-lg border-0">
        <div class="card-body p-4">
          <h4 class="card-title text-center mb-4">Selamat Datang Kembali</h4>
          
          {#if errors.general}
            <div class="alert alert-danger d-flex align-items-center" role="alert">
              <i class="fas fa-exclamation-triangle me-2"></i>
              {errors.general}
            </div>
          {/if}
          
          <form on:submit={handleSubmit}>
            <!-- Email -->
            <div class="mb-3">
              <label for="email" class="form-label">
                <i class="fas fa-envelope me-1 text-muted"></i>Email
              </label>
              <input
                type="email"
                class="form-control {errors.email ? 'is-invalid' : ''}"
                id="email"
                bind:value={formData.email}
                placeholder="nama@email.com"
              />
              {#if errors.email}
                <div class="invalid-feedback">{errors.email}</div>
              {/if}
            </div>

            <!-- Password -->
            <div class="mb-3">
              <label for="password" class="form-label">
                <i class="fas fa-lock me-1 text-muted"></i>Password
              </label>
              <div class="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  class="form-control {errors.password ? 'is-invalid' : ''}"
                  id="password"
                  bind:value={formData.password}
                  placeholder="Masukkan password"
                />
                <button 
                  type="button" 
                  class="btn btn-outline-secondary"
                  on:click={togglePasswordVisibility}
                >
                  <i class="fas {showPassword ? 'fa-eye-slash' : 'fa-eye'}"></i>
                </button>
                {#if errors.password}
                  <div class="invalid-feedback">{errors.password}</div>
                {/if}
              </div>
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="d-flex justify-content-between align-items-center mb-4">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="rememberMe"
                  bind:checked={rememberMe}
                />
                <label class="form-check-label small text-muted" for="rememberMe">
                  Ingat saya
                </label>
              </div>
              <a href="/forgot-password" class="small text-decoration-none text-muted">
                Lupa password?
              </a>
            </div>

            <!-- Submit Button -->
            <button 
              type="submit" 
              class="btn btn-primary w-100 py-2"
              disabled={isLoading}
            >
              {#if isLoading}
                <span class="spinner-border spinner-border-sm me-2" role="status"></span>
                Memproses...
              {:else}
                <i class="fas fa-sign-in-alt me-2"></i>Masuk
              {/if}
            </button>
          </form>

          <!-- Divider -->
          <!-- <div class="text-center my-4">
            <span class="text-muted">atau</span>
          </div> -->

          <!-- Demo Accounts -->
          <div class="mb-4">
            <p class="small text-muted text-center mb-2">Akun Demo (Klik untuk login):</p>
            <div class="row g-2">
              <div class="col-12">
                <button 
                  type="button" 
                  class="btn btn-outline-info w-100 btn-sm"
                  on:click={() => fillDemoAccount('user@example.com', 'password123')}
                >
                  <i class="fas fa-user me-1"></i>ikanlover
                </button>
              </div>
              <div class="col-6">
                <button 
                  type="button" 
                  class="btn btn-outline-success w-100 btn-sm"
                  on:click={() => fillDemoAccount('budidaya@example.com', 'password123')}
                >
                  Budidaya
                </button>
              </div>
              <div class="col-6">
                <button 
                  type="button" 
                  class="btn btn-outline-warning w-100 btn-sm"
                  on:click={() => fillDemoAccount('hias@example.com', 'password123')}
                >
                  Ikan Hias
                </button>
              </div>
            </div>
          </div>

          <!-- Social Login (Mock) -->
          <!-- <div class="row g-2 mb-4">
            <div class="col-6">
              <button class="btn btn-outline-danger w-100" disabled>
                <i class="fab fa-google me-2"></i>Google
              </button>
            </div>
            <div class="col-6">
              <button class="btn btn-outline-primary w-100" disabled>
                <i class="fab fa-facebook me-2"></i>Facebook
              </button>
            </div>
          </div> -->

          <!-- Register Link -->
          <div class="text-center">
            <p class="text-muted mb-0">
              Belum punya akun? 
              <a href="/register" class="text-decoration-none fw-semibold">Daftar di sini</a>
            </p>
          </div>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="mt-4 text-center">
        <div class="row">
          <div class="col-4">
            <div class="border-end">
              <div class="fw-bold text-primary">5K+</div>
              <small class="text-muted">Anggota</small>
            </div>
          </div>
          <div class="col-4">
            <div class="border-end">
              <div class="fw-bold text-success">20K+</div>
              <small class="text-muted">Diskusi</small>
            </div>
          </div>
          <div class="col-4">
            <div class="fw-bold text-warning">50+</div>
            <small class="text-muted">Ahli</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .card {
    border-radius: 15px;
  }
  
  .btn {
    border-radius: 10px;
  }
  
  .form-control {
    border-radius: 10px;
    padding: 12px 15px;
  }
  
  .input-group .btn {
    border-radius: 0 10px 10px 0;
  }
</style>