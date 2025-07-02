document.addEventListener('DOMContentLoaded', () => {
    // --- STATE MANAGEMENT ---
    let isAdmin = false;
    let comments = JSON.parse(localStorage.getItem('comments')) || [];

    // --- ELEMENT SELECTORS ---
    const contentDiv = document.getElementById('content');
    const musicToggleBtn = document.getElementById('music-toggle-btn');
    const backgroundMusic = document.getElementById('background-music');
    const loginModal = document.getElementById('login-modal');
    const loginBtnHeader = document.getElementById('login-btn-header');
    const closeModalBtn = document.querySelector('.close-btn');
    const loginForm = document.getElementById('login-form');

    // --- CONTENT DATA ---
    const contentData = {
        struktur: `
            <h2>Struktur Kelas 9B</h2>
            <ul>
                <li>Ketua Kelas: Akan Hadir</li>
                <li>Wakil Ketua: Akan Hadir</li>
                <li>Sekretaris 1: Akan Hadir</li>
                <li>Sekretaris 2: Akan Hadir</li>
                <li>Bendahara 1: Akan Hadir</li>
                <li>Bendahara 2: Akan Hadir</li>
            </ul>
        `,
        anggota: `
            <h2>Daftar Anggota Siswa Kelas 9B (32 Siswa)</h2>
            <ol>
                <li>Adelia Ainun Zakia</li><li>Adinda Selmi Yusfita</li><li>Ahmad Putra Nurrohim</li>
                <li>Alisia Jastin</li><li>Amelia Nur Rahmadani</li><li>Anita Sulfania</li>
                <li>Cahya Nengrum Aulia Ulfah</li><li>Choliv Fuadiya</li><li>Dafi idriansyah</li>
                <li>Devi Nur Maulidda</li><li>Dewi Audray Agdiningviar</li><li>Dimas Surya Irawan</li>
                <li>Dira Hadi Erwanto</li><li>Dwi Irji Febiana</li><li>Edo Hariyadi</li>
                <li>Erwin Alfiromdoni</li><li>Imana Pungky Mavano</li><li>Micko Maulana</li>
                <li>Muhamad Azriel Ardianta</li><li>Muhamad Fahmy Ferdiansyah</li><li>Muhamad Farras Ahsanul Huda</li>
                <li>Muhammad Arjuna Muarif Salam</li><li>Muhammad Rishad Tabatala Arsodiq</li><li>Mutiara Dwi Febrianti</li>
                <li>Nabila Azzahra</li><li>Nur Sabrina</li><li>Putri Nur Ainiyyah Zahraa</li>
                <li>Riyo Ramadhani</li><li>Silda Simatus Zahro</li><li>Sintia Nabila</li>
                <li>Yogik Aditiyono</li><li>Zaky Sofyan</li>
            </ol>
        `,
        tata: `
            <h2>Tata Tertib Kelas</h2>
            <ol>
                <li>Datang tepat waktu sebelum jam pelajaran dimulai.</li>
                <li>Berpakaian rapi dan sesuai peraturan sekolah.</li>
                <li>Berperilaku sopan terhadap guru dan teman.</li>
                <li>Menjaga kebersihan dan kerapihan kelas.</li>
            </ol>
        `,
        kebersihan: `
            <h2>Peraturan Kebersihan Kelas</h2>
            <ul>
                <li>Buang sampah pada tempatnya.</li>
                <li>Dilarang makan/minum di dalam kelas saat pelajaran berlangsung.</li>
                <li>Petugas piket wajib menyapu dan merapikan kelas setiap pagi dan sebelum pulang sekolah.</li>
            </ul>
        `,
        pelajaran: `
            <h2>Jadwal Pelajaran Kelas 9B</h2>
            <table>
                <tr><th>Hari</th><th>Mata Pelajaran</th></tr>
                <tr><td>Senin</td><td>Segera Hadir</td></tr>
                <tr><td>Selasa</td><td>Segera Hadir</td></tr>
                <tr><td>Rabu</td><td>Segera Hadir</td></tr>
                <tr><td>Kamis</td><td>Segera Hadir</td></tr>
                <tr><td>Jumat</td><td>Segera Hadir</td></tr>
                <tr><td>Sabtu</td><td>P5,P5,P5</td></tr>
            </table>
        `,
        piket: `
            <h2>Jadwal Piket Mingguan</h2>
            <table>
                <tr><th>Hari</th><th>Nama Petugas</th></tr>
                <tr><td>Senin</td><td>Segera Hadir</td></tr>
                <tr><td>Selasa</td><td>Segera Hadir</td></tr>
                <tr><td>Rabu</td><td>Segera Hadir</td></tr>
                <tr><td>Kamis</td><td>Segera Hadir</td></tr>
                <tr><td>Jumat</td><td>Segera Hadir</td></tr>
                <tr><td>Sabtu</td><td>Segera Hadir</td></tr>
            </table>
        `,
        pr: `
            <h2>Tugas / PR Terbaru</h2>
            <ul>
                <li>Matematika: segera hadir</li>
                <li>IPA: segera hadir</li>
                <li>PKN: segera hadir</li>
            </ul>
        `,
        galeri: `
            <h2>Galeri Foto & Kenangan</h2>
            <img src="fotoulangan.jpg" alt="Foto Ulangan" style="width:100%; border-radius:10px;">
            <p>📸 foto ulangan hari ke 2 😍</p>
            <img src="persiapanupacara.jpg" alt="Persiapan Upacara" style="width:100%; border-radius:10px;">
            <p>📸 foto persiapan upacara 😍</p>
            <img src="upacara1.jpg" alt="Setelah Upacara" style="width:100%; border-radius:10px;">
            <p>📸 fotbar setelah upacara 😍</p>
            <img src="upacara2.jpg" alt="Setelah Upacara" style="width:100%; border-radius:10px;">
            <p>📸 fotbar setelah upacara 😍</p>
            <img src="upacara3.jpg" alt="Setelah Upacara" style="width:100%; border-radius:10px;">
            <p>📸 fotbar setelah upacara 😍</p>
            <img src="kemah1.jpg" alt="Kegiatan Kemah" style="width:100%; border-radius:10px;">
            <p>📸 fotbar cewek cantik 8b 😍</p>
            <img src="kemah2.jpg" alt="Kegiatan Kemah" style="width:100%; border-radius:10px;">
            <p>📸 Arjuna kecapean makan 🤣🤣</p>
            <img src="kemah3.jpg" alt="Kegiatan Kemah" style="width:100%; border-radius:10px;">
            <p>📸 foto bapak" ngerumpi😍</p>
            <img src="kemah4.jpg" alt="Kegiatan Kemah" style="width:100%; border-radius:10px;">
            <p>📸 cewek nya makan, cowok nya yang masak 😅</p>
            <img src="tarian1.jpg" alt="Setelah Menari" style="width:100%; border-radius:10px;">
            <p>📸 fotbar setelah tampil menari 😍</p>
            <img src="ibul.jpg" alt="Bersama Ibu Laila" style="width:100%; border-radius:10px;">
            <p>📸 foto bersama Ibu Laila 😍😍</p>
        `,
        pesan: `
            <h2>Pesan & Komentar</h2>
            <p>Tinggalkan pesan, kesan, atau sekadar sapaan untuk teman-teman!</p>
            <div id="comment-list"></div>
            <form id="comment-form">
                <input type="text" id="comment-name" placeholder="Nama Anda" required>
                <textarea id="comment-text" rows="4" placeholder="Tulis komentar Anda..." required></textarea>
                <button type="submit">Kirim Pesan</button>
            </form>
        `
    };

    // --- FUNCTIONS ---
    function showContent(menuKey) {
        contentDiv.innerHTML = contentData[menuKey] || "<p>Menu belum tersedia.</p>";
        if (menuKey === 'pesan') {
            renderComments();
            // Add event listener for the new form
            const newCommentForm = document.getElementById('comment-form');
            if (newCommentForm) {
                newCommentForm.addEventListener('submit', handleCommentSubmit);
            }
        }
    }

    function renderComments() {
        const commentList = document.getElementById('comment-list');
        if (!commentList) return;
        commentList.innerHTML = ''; // Clear existing comments
        comments.forEach((comment, index) => {
            const commentDiv = document.createElement('div');
            commentDiv.className = 'comment-item';
            commentDiv.innerHTML = `
                <p><strong>${escapeHTML(comment.name)}:</strong></p>
                <p>${escapeHTML(comment.text)}</p>
                <button class="admin-only delete-comment-btn" data-index="${index}">Hapus</button>
            `;
            commentList.appendChild(commentDiv);
        });
        
        // Add event listeners for delete buttons
        document.querySelectorAll('.delete-comment-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const indexToDelete = e.target.getAttribute('data-index');
                deleteComment(indexToDelete);
            });
        });
    }
    
    function handleCommentSubmit(event) {
        event.preventDefault();
        const nameInput = document.getElementById('comment-name');
        const textInput = document.getElementById('comment-text');
        
        const newComment = {
            name: nameInput.value,
            text: textInput.value
        };
        
        comments.push(newComment);
        localStorage.setItem('comments', JSON.stringify(comments));
        
        renderComments();
        
        nameInput.value = '';
        textInput.value = '';
    }
    
    function deleteComment(index) {
        if (!isAdmin) {
            alert('Anda harus login sebagai admin untuk menghapus komentar.');
            return;
        }
        comments.splice(index, 1);
        localStorage.setItem('comments', JSON.stringify(comments));
        renderComments();
    }

    function toggleMusic() {
        if (backgroundMusic.paused) {
            backgroundMusic.play().catch(e => console.log("Autoplay ditolak oleh browser. Interaksi user diperlukan."));
            musicToggleBtn.textContent = '⏸️ Jeda Musik';
        } else {
            backgroundMusic.pause();
            musicToggleBtn.textContent = '🎵 Putar Musik';
        }
    }

    function handleLogin(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Ganti 'admin' dan '12345' dengan username & password yang Anda inginkan
        if (username === 'admin' && password === '12345') {
            isAdmin = true;
            document.body.classList.add('admin-view');
            loginModal.style.display = 'none';
            loginBtnHeader.textContent = 'Logout';
            alert('Login berhasil!');
            showContent(document.querySelector('.menu-btn.active')?.dataset.menu || 'struktur'); // Refresh content to show admin buttons
        } else {
            alert('Username atau password salah!');
        }
    }

    function logout() {
        isAdmin = false;
        document.body.classList.remove('admin-view');
        loginBtnHeader.textContent = 'Login Admin';
        alert('Anda telah logout.');
        showContent(document.querySelector('.menu-btn.active')?.dataset.menu || 'struktur'); // Refresh content to hide admin buttons
    }
    
    // Simple HTML escaping function to prevent XSS
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }

    // --- EVENT LISTENERS ---
    document.querySelectorAll('.menu-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const menuKey = e.target.getAttribute('data-menu');
            showContent(menuKey);
        });
    });

    musicToggleBtn.addEventListener('click', toggleMusic);

    loginBtnHeader.addEventListener('click', () => {
        if (isAdmin) {
            logout();
        } else {
            loginModal.style.display = 'block';
        }
    });

    closeModalBtn.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == loginModal) {
            loginModal.style.display = 'none';
        }
    });

    loginForm.addEventListener('submit', handleLogin);
});
