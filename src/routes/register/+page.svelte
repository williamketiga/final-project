<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let formData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  
  let isLoading = false;
  let errors = {};
  let showPassword = false;

  const validateForm = () => {
    errors = {};
    
    if (!formData.username) {
      errors.username = 'Username wajib diisi';
    } else if (formData.username.length < 3) {
      errors.username = 'Username minimal 3 karakter';
    }
    
    if (!formData.email) {
      errors.email = 'Email wajib diisi';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Format email tidak valid';
    }
    
    if (!formData.password) {
      errors.password = 'Password wajib diisi';
    } else if (formData.password.length < 6) {
      errors.password = 'Password minimal 6 karakter';
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Password tidak cocok';
    }
    
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    isLoading = true;
    
    // Integrasi ke API Register
    try{
      const response = await fetch('/api/register', {
        method:'POST',
        headers:{
          'Content-Type' : 'application/json',
          
        },
        body: JSON.stringify({
          email : formData.email,
          username : formData.username,
          password : formData.password
        })
      })

      const result = await response.json()
      console.log(result);

      if(!result){
        console.log(`Register Failed! ${result}`)
      }
      goto('/login')

    }catch(err){

    }
    
    isLoading = false;
  };

  const togglePasswordVisibility = () => {
    showPassword = !showPassword;
  };
</script>

<svelte:head>
  <title>ForumIkan - Daftar Akun</title>
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
        <p class="text-muted">Bergabung dengan komunitas pecinta ikan</p>
      </div>

      <!-- Registration Card -->
      <div class="card shadow-lg border-0">
        <div class="card-body p-4">
          <h4 class="card-title text-center mb-4">Buat Akun Baru</h4>
          
          <form on:submit={handleSubmit}>
            <!-- Username -->
            <div class="mb-3">
              <label for="username" class="form-label">
                <i class="fas fa-user me-1 text-muted"></i>Username
              </label>
              <input
                type="text"
                class="form-control {errors.username ? 'is-invalid' : ''}"
                id="username"
                bind:value={formData.username}
                placeholder="Masukkan username"
              />
              {#if errors.username}
                <div class="invalid-feedback">{errors.username}</div>
              {/if}
            </div>

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
                  placeholder="Minimal 6 karakter"
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

            <!-- Confirm Password -->
            <div class="mb-4">
              <label for="confirmPassword" class="form-label">
                <i class="fas fa-lock me-1 text-muted"></i>Konfirmasi Password
              </label>
              <input
                type="password"
                class="form-control {errors.confirmPassword ? 'is-invalid' : ''}"
                id="confirmPassword"
                bind:value={formData.confirmPassword}
                placeholder="Ketik ulang password"
              />
              {#if errors.confirmPassword}
                <div class="invalid-feedback">{errors.confirmPassword}</div>
              {/if}
            </div>

            <!-- Submit Button -->
            <button 
              type="submit" 
              class="btn btn-primary w-100 py-2"
              disabled={isLoading}
            >
              {#if isLoading}
                <span class="spinner-border spinner-border-sm me-2" role="status"></span>
                Mendaftarkan...
              {:else}
                <i class="fas fa-user-plus me-2"></i>Daftar Sekarang
              {/if}
            </button>
          </form>

          <!-- Divider -->
          <!-- <div class="text-center my-4">
            <span class="text-muted">atau</span>
          </div> -->

          <!-- Social Login (Mock)
          <div class="row g-2">
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

          <!-- Login Link -->
          <div class="text-center mt-4">
            <p class="text-muted">
              Sudah punya akun? 
              <a href="/login" class="text-decoration-none fw-semibold">Login di sini</a>
            </p>
          </div>
        </div>
      </div>

      <!-- Features List -->
      <div class="mt-4">
        <div class="row text-center g-3">
          <div class="col-4">
            <div class="text-primary">
              <i class="fas fa-users fa-lg mb-2"></i>
              <p class="small mb-0">Komunitas Aktif</p>
            </div>
          </div>
          <div class="col-4">
            <div class="text-success">
              <i class="fas fa-graduation-cap fa-lg mb-2"></i>
              <p class="small mb-0">Belajar Gratis</p>
            </div>
          </div>
          <div class="col-4">
            <div class="text-warning">
              <i class="fas fa-shield-alt fa-lg mb-2"></i>
              <p class="small mb-0">Aman & Terpercaya</p>
            </div>
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