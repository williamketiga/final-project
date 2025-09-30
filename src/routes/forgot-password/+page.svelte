<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  let formData = {
    password: '',
    confirmPassword: ''
  };
  
  let isLoading = false;
  let errors = {};
  let showPassword = false;
  let showConfirmPassword = false;
  let isSuccess = false;

  // Mock token dari URL (dalam real app, ini dari query parameter)
  let resetToken = $page.url.searchParams.get('token') || 'mock-token-123';

  const validateForm = () => {
    errors = {};
    
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
    
    // Mock process - reset password
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock success
    isSuccess = true;
    
    // Show success message
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: 'success',
        title: 'Password Berhasil Direset!',
        text: 'Silakan login dengan password baru Anda',
        timer: 3000,
        showConfirmButton: false
      });
    }
    
    // Redirect ke login setelah 3 detik
    setTimeout(() => {
      goto('/login');
    }, 3000);
    
    isLoading = false;
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      showPassword = !showPassword;
    } else {
      showConfirmPassword = !showConfirmPassword;
    }
  };

  // Check if token is valid (mock)
  const isTokenValid = resetToken && resetToken !== 'invalid';
</script>

<svelte:head>
  <title>ForumIkan - Reset Password</title>
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
        <p class="text-muted">Buat password baru</p>
      </div>

      {#if !isTokenValid}
        <!-- Invalid Token Card -->
        <div class="card shadow-lg border-0">
          <div class="card-body p-4 text-center">
            <div class="bg-danger rounded-circle d-inline-flex align-items-center justify-content-center text-white mb-3" style="width: 80px; height: 80px;">
              <i class="fas fa-exclamation-triangle fa-2x"></i>
            </div>
            
            <h4 class="card-title text-danger">Tautan Tidak Valid</h4>
            <p class="text-muted mb-4">
              Tautan reset password tidak valid atau sudah kedaluwarsa.
              Silakan request tautan reset password baru.
            </p>
            
            <div class="d-grid gap-2">
              <a href="/forgot-password" class="btn btn-primary">
                <i class="fas fa-redo me-2"></i>Request Tautan Baru
              </a>
              <a href="/login" class="btn btn-outline-secondary">
                <i class="fas fa-arrow-left me-2"></i>Kembali ke Login
              </a>
            </div>
          </div>
        </div>
      {:else if isSuccess}
        <!-- Success Card -->
        <div class="card shadow-lg border-0">
          <div class="card-body p-4 text-center">
            <div class="bg-success rounded-circle d-inline-flex align-items-center justify-content-center text-white mb-3" style="width: 80px; height: 80px;">
              <i class="fas fa-check fa-2x"></i>
            </div>
            
            <h4 class="card-title text-success">Berhasil!</h4>
            <p class="text-muted mb-4">
              Password Anda berhasil direset. 
              Anda akan diarahkan ke halaman login dalam beberapa detik.
            </p>
            
            <div class="progress mb-4" style="height: 6px;">
              <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: 100%"></div>
            </div>
            
            <a href="/login" class="btn btn-primary">
              <i class="fas fa-sign-in-alt me-2"></i>Login Sekarang
            </a>
          </div>
        </div>
      {:else}
        <!-- Reset Password Form Card -->
        <div class="card shadow-lg border-0">
          <div class="card-body p-4">
            <div class="text-center mb-4">
              <div class="bg-warning rounded-circle d-inline-flex align-items-center justify-content-center text-white mb-3" style="width: 80px; height: 80px;">
                <i class="fas fa-lock fa-2x"></i>
              </div>
              <h4 class="card-title">Password Baru</h4>
              <p class="text-muted small">
                Buat password baru untuk akun ForumIkan Anda
              </p>
            </div>
            
            <form on:submit={handleSubmit}>
              <!-- New Password -->
              <div class="mb-3">
                <label for="password" class="form-label">
                  <i class="fas fa-lock me-1 text-muted"></i>Password Baru
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
                    on:click={() => togglePasswordVisibility('password')}
                  >
                    <i class="fas {showPassword ? 'fa-eye-slash' : 'fa-eye'}"></i>
                  </button>
                  {#if errors.password}
                    <div class="invalid-feedback">{errors.password}</div>
                  {/if}
                </div>
                <div class="form-text">
                  Gunakan kombinasi huruf, angka, dan simbol untuk keamanan lebih
                </div>
              </div>

              <!-- Confirm Password -->
              <div class="mb-4">
                <label for="confirmPassword" class="form-label">
                  <i class="fas fa-lock me-1 text-muted"></i>Konfirmasi Password
                </label>
                <div class="input-group">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    class="form-control {errors.confirmPassword ? 'is-invalid' : ''}"
                    id="confirmPassword"
                    bind:value={formData.confirmPassword}
                    placeholder="Ketik ulang password baru"
                  />
                  <button 
                    type="button" 
                    class="btn btn-outline-secondary"
                    on:click={() => togglePasswordVisibility('confirmPassword')}
                  >
                    <i class="fas {showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}"></i>
                  </button>
                  {#if errors.confirmPassword}
                    <div class="invalid-feedback">{errors.confirmPassword}</div>
                  {/if}
                </div>
              </div>

              <!-- Password Strength Indicator -->
              <div class="mb-4">
                <div class="password-strength">
                  <div class="d-flex justify-content-between mb-1">
                    <small class="text-muted">Kekuatan Password:</small>
                    <small class="text-muted">
                      {#if formData.password.length === 0}
                        -
                      {:else if formData.password.length < 6}
                        <span class="text-danger">Lemah</span>
                      {:else if formData.password.length < 10}
                        <span class="text-warning">Sedang</span>
                      {:else}
                        <span class="text-success">Kuat</span>
                      {/if}
                    </small>
                  </div>
                  <div class="progress" style="height: 5px;">
                    <div 
                      class="progress-bar {formData.password.length < 6 ? 'bg-danger' : formData.password.length < 10 ? 'bg-warning' : 'bg-success'}" 
                      style="width: {Math.min((formData.password.length / 12) * 100, 100)}%"
                    ></div>
                  </div>
                </div>
              </div>

              <!-- Submit Button -->
              <button 
                type="submit" 
                class="btn btn-primary w-100 py-2 mb-3"
                disabled={isLoading}
              >
                {#if isLoading}
                  <span class="spinner-border spinner-border-sm me-2" role="status"></span>
                  Mereset Password...
                {:else}
                  <i class="fas fa-save me-2"></i>Simpan Password Baru
                {/if}
              </button>
            </form>

            <!-- Security Tips -->
            <div class="alert alert-warning">
              <small>
                <i class="fas fa-shield-alt me-1"></i>
                <strong>Tips Keamanan:</strong> Jangan gunakan password yang sama dengan akun lain
              </small>
            </div>
          </div>
        </div>
      {/if}

      <!-- Support Info -->
      <div class="mt-4 text-center">
        <p class="small text-muted">
          Masih mengalami masalah? 
          <a href="mailto:support@forumikan.com" class="text-decoration-none">Hubungi Support</a>
        </p>
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
  
  .progress {
    border-radius: 10px;
  }
  
  .password-strength .progress-bar {
    border-radius: 10px;
    transition: all 0.3s ease;
  }
</style>