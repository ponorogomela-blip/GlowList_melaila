import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProduk() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        judul: "",
        deskripsi: "",
        harga: "",
        id_kategori: "",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/produk/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setFormData(data[0]); // ambil data pertama hasil query
                setLoading(false);
            })
            .catch((err) => console.error(err));
    }, [id]);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isConfirmed = window.confirm("Yakin mau menyimpan perubahan ini?");
        if (!isConfirmed) {
            return; // Batalkan kirim data jika pengguna memilih Cancel
        }
       
        await fetch(`http://localhost:5000/produk/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        alert("Produk berhasil dipebarui!");
        navigate("/produk");
    };

    if (loading) {
        return <div className="container mt-4">Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <h2>Edit Produk</h2>

            <form onSubmit={handleSubmit} className="mt-3">
                <div className="mb-3">
                    <label className="form-label">Judul</label>
                    <input
                        type="text"
                        name="judul"
                        value={formData.judul}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Deskripsi</label>
                    <input
                        type="text"
                        name="deskripsi"
                        value={formData.deskripsi}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Harga</label>
                    <input
                        type="number"
                        name="harga"
                        value={formData.harga}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">ID Kategori</label>
                    <input
                        type="text"
                        name="id_kategori"
                        value={formData.id_kategori}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <button type="submit" className="btn btn-success me-2">
                    Simpan Perubahan
                </button>
            </form>
        </div>
    );
}