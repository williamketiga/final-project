<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  // Data state
  let user = null;
  let stats = {
    totalPosts: 0,
    totalLikes: 0,
    totalComments: 0,
    totalFollowers: 0
  };
  
  let recentPosts = [];
  let trendingPosts = [];
  let isLoading = true;

  // Load dashboard data
  async function loadDashboardData() {
    if (!browser) return;
    
    try {
      // Get user data from localStorage
      const userData = localStorage.getItem('user');
      if (userData) {
        user = JSON.parse(userData);
      }

      // Load stats (mock data for now)
      stats = {
        totalPosts: 124,
        totalLikes: 842,
        totalComments: 156,
        totalFollowers: 89
      };

      // Load recent posts
      const postsResponse = await fetch('/api/posts?limit=5');
      const postsResult = await postsResponse.json();
      
      if (postsResult.success) {
        recentPosts = postsResult.data;
      }

      // Load trending posts (mock)
      trendingPosts = [
        { id: 1, title: 'Cara Merawat Ikan Koi Musim Hujan', likes: 45, comments: 12 },
        { id: 2, title: 'Jenis Pakan Terbaik untuk Ikan Cupang', likes: 38, comments: 8 },
        { id: 3, title: 'Solusi Aquarium Berlumut', likes: 32, comments: 15 }
      ];

    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      isLoading = false;
    }
  }

  onMount(() => {
    loadDashboardData();
  });
</script>

<svelte:head>
  <title>Dashboard - ForumIkan</title>
</svelte:head>

{#if isLoading}
  <!-- Loading State -->
  <div class="dashboard-loading">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <p class="mt-3">Memuat dashboard...</p>
  </div>
{:else}
  <!-- Dashboard Content -->
  <div class="dashboard-container">
    <!-- Header -->
    <div class="dashboard-header">
      <div class="header-content">
        <h1 class="dashboard-title">
          <i class="fas fa-tachometer-alt me-2"></i>
          Dashboard
        </h1>
        <p class="dashboard-subtitle">
          Selamat datang kembali, {user?.username || 'Teman Ikan'}! 👋
        </p>
      </div>
      <div class="header-actions">
        <button class="btn btn-primary">
          <i class="fas fa-plus me-2"></i>Buat Post
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card primary">
        <div class="stat-icon">
          <i class="fas fa-file-alt"></i>
        </div>
        <div class="stat-content">
          <h3 class="stat-value">{stats.totalPosts}</h3>
          <p class="stat-label">Total Posts</p>
        </div>
      </div>

      <div class="stat-card success">
        <div class="stat-icon">
          <i class="fas fa-heart"></i>
        </div>
        <div class="stat-content">
          <h3 class="stat-value">{stats.totalLikes}</h3>
          <p class="stat-label">Total Likes</p>
        </div>
      </div>

      <div class="stat-card warning">
        <div class="stat-icon">
          <i class="fas fa-comments"></i>
        </div>
        <div class="stat-content">
          <h3 class="stat-value">{stats.totalComments}</h3>
          <p class="stat-label">Total Komentar</p>
        </div>
      </div>

      <div class="stat-card info">
        <div class="stat-icon">
          <i class="fas fa-users"></i>
        </div>
        <div class="stat-content">
          <h3 class="stat-value">{stats.totalFollowers}</h3>
          <p class="stat-label">Pengikut</p>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="dashboard-content">
      <!-- Recent Posts -->
      <div class="content-card">
        <div class="card-header">
          <h3 class="card-title">
            <i class="fas fa-clock me-2"></i>
            Postingan Terbaru
          </h3>
          <a href="/posts" class="btn-link">Lihat Semua</a>
        </div>
        <div class="card-body">
          {#if recentPosts.length > 0}
            <div class="posts-list">
              {#each recentPosts as post}
                <div class="post-item">
                  <div class="post-avatar">
                    <i class="fas fa-user"></i>
                  </div>
                  <div class="post-content">
                    <h4 class="post-title">{post.caption.substring(0, 50)}...</h4>
                    <div class="post-meta">
                      <span class="post-author">@{post.username}</span>
                      <span class="post-date">{new Date(post.created_at).toLocaleDateString('id-ID')}</span>
                    </div>
                    <div class="post-stats">
                      <span class="stat-item">
                        <i class="fas fa-heart"></i> {post.likes || 0}
                      </span>
                      <span class="stat-item">
                        <i class="fas fa-comment"></i> {post.comments?.length || 0}
                      </span>
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          {:else}
            <div class="empty-state">
              <i class="fas fa-inbox"></i>
              <p>Belum ada postingan</p>
              <a href="/posts/create" class="btn btn-primary btn-sm">Buat Post Pertama</a>
            </div>
          {/if}
        </div>
      </div>

      <!-- Trending & Quick Actions -->
      <div class="sidebar-cards">
        <!-- Trending Posts -->
        <div class="content-card">
          <div class="card-header">
            <h3 class="card-title">
              <i class="fas fa-fire me-2"></i>
              Trending
            </h3>
          </div>
          <div class="card-body">
            <div class="trending-list">
              {#each trendingPosts as post, index}
                <div class="trending-item">
                  <div class="trending-rank">{index + 1}</div>
                  <div class="trending-content">
                    <h5 class="trending-title">{post.title}</h5>
                    <div class="trending-stats">
                      <span>{post.likes} likes</span>
                      <span>{post.comments} comments</span>
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="content-card">
          <div class="card-header">
            <h3 class="card-title">
              <i class="fas fa-bolt me-2"></i>
              Quick Actions
            </h3>
          </div>
          <div class="card-body">
            <div class="quick-actions">
              <a href="/posts/create" class="action-btn">
                <i class="fas fa-edit"></i>
                <span>Tulis Post</span>
              </a>
              <a href="/profile" class="action-btn">
                <i class="fas fa-user"></i>
                <span>Edit Profile</span>
              </a>
              <a href="/messages" class="action-btn">
                <i class="fas fa-envelope"></i>
                <span>Pesan</span>
              </a>
              <a href="/settings" class="action-btn">
                <i class="fas fa-cog"></i>
                <span>Pengaturan</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Community Stats -->
        <div class="content-card">
          <div class="card-header">
            <h3 class="card-title">
              <i class="fas fa-chart-bar me-2"></i>
              Statistik Komunitas
            </h3>
          </div>
          <div class="card-body">
            <div class="community-stats">
              <div class="community-stat">
                <div class="stat-number">5.2K</div>
                <div class="stat-label">Anggota</div>
              </div>
              <div class="community-stat">
                <div class="stat-number">24.7K</div>
                <div class="stat-label">Postingan</div>
              </div>
              <div class="community-stat">
                <div class="stat-number">189K</div>
                <div class="stat-label">Komentar</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Dashboard Layout */
  .dashboard-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 20px;
  }

  .dashboard-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    color: white;
  }

  /* Header */
  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    background: white;
    padding: 2rem;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }

  .dashboard-title {
    font-size: 2.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0;
  }

  .dashboard-subtitle {
    color: #666;
    margin: 0.5rem 0 0 0;
    font-size: 1.1rem;
  }

  /* Stats Grid */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .stat-card {
    background: white;
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
    display: flex;
    align-items: center;
    gap: 1.5rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .stat-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }

  .stat-card.primary { border-left: 4px solid #667eea; }
  .stat-card.success { border-left: 4px solid #10b981; }
  .stat-card.warning { border-left: 4px solid #f59e0b; }
  .stat-card.info { border-left: 4px solid #3b82f6; }

  .stat-icon {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
  }

  .stat-card.primary .stat-icon { background: rgba(102, 126, 234, 0.1); color: #667eea; }
  .stat-card.success .stat-icon { background: rgba(16, 185, 129, 0.1); color: #10b981; }
  .stat-card.warning .stat-icon { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
  .stat-card.info .stat-icon { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }

  .stat-value {
    font-size: 2.5rem;
    font-weight: 800;
    margin: 0;
    color: #1f2937;
  }

  .stat-label {
    color: #6b7280;
    margin: 0;
    font-weight: 600;
  }

  /* Content Grid */
  .dashboard-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
  }

  .content-card {
    background: white;
    border-radius: 15px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
    margin-bottom: 2rem;
  }

  .card-header {
    padding: 1.5rem 2rem;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-title {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0;
    color: #1f2937;
  }

  .btn-link {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
  }

  .btn-link:hover {
    text-decoration: underline;
  }

  .card-body {
    padding: 2rem;
  }

  /* Posts List */
  .posts-list {
    space-y: 1rem;
  }

  .post-item {
    display: flex;
    gap: 1rem;
    padding: 1rem 0;
    border-bottom: 1px solid #f3f4f6;
  }

  .post-item:last-child {
    border-bottom: none;
  }

  .post-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #f3f4f6;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #667eea;
    font-size: 1.2rem;
  }

  .post-title {
    font-weight: 600;
    margin: 0 0 0.5rem 0;
    color: #1f2937;
  }

  .post-meta {
    display: flex;
    gap: 1rem;
    margin-bottom: 0.5rem;
  }

  .post-author {
    color: #667eea;
    font-weight: 600;
    font-size: 0.9rem;
  }

  .post-date {
    color: #9ca3af;
    font-size: 0.9rem;
  }

  .post-stats {
    display: flex;
    gap: 1rem;
  }

  .stat-item {
    color: #6b7280;
    font-size: 0.85rem;
  }

  /* Trending */
  .trending-list {
    space-y: 1rem;
  }

  .trending-item {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    padding: 1rem 0;
    border-bottom: 1px solid #f3f4f6;
  }

  .trending-item:last-child {
    border-bottom: none;
  }

  .trending-rank {
    width: 30px;
    height: 30px;
    background: #667eea;
    color: white;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.8rem;
  }

  .trending-title {
    font-weight: 600;
    margin: 0 0 0.25rem 0;
    font-size: 0.95rem;
    color: #1f2937;
  }

  .trending-stats {
    display: flex;
    gap: 1rem;
    font-size: 0.8rem;
    color: #6b7280;
  }

  /* Quick Actions */
  .quick-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .action-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1.5rem 1rem;
    background: #f8fafc;
    border: 2px dashed #e2e8f0;
    border-radius: 12px;
    text-decoration: none;
    color: #4b5563;
    transition: all 0.3s ease;
  }

  .action-btn:hover {
    background: #667eea;
    color: white;
    border-color: #667eea;
    transform: translateY(-2px);
  }

  .action-btn i {
    font-size: 1.5rem;
  }

  .action-btn span {
    font-weight: 600;
    font-size: 0.9rem;
  }

  /* Community Stats */
  .community-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    text-align: center;
  }

  .community-stat {
    padding: 1rem;
  }

  .stat-number {
    font-size: 1.5rem;
    font-weight: 800;
    color: #667eea;
    margin-bottom: 0.25rem;
  }

  .stat-label {
    font-size: 0.8rem;
    color: #6b7280;
    font-weight: 600;
  }

  /* Empty State */
  .empty-state {
    text-align: center;
    padding: 3rem 2rem;
    color: #6b7280;
  }

  .empty-state i {
    font-size: 3rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .dashboard-content {
      grid-template-columns: 1fr;
    }
    
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .dashboard-header {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }
    
    .stats-grid {
      grid-template-columns: 1fr;
    }
    
    .quick-actions {
      grid-template-columns: 1fr;
    }
    
    .community-stats {
      grid-template-columns: 1fr;
    }
  }
</style>