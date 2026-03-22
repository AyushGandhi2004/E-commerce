import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/User'
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';

const Dashboard = () => {
    const { user , setUser } = useContext(UserContext);
    const [isAdmin,setIsAdmin] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const navigate = useNavigate();

    const checkAdmin = async ()=>{
        try {
            const response = await api.get('/auth/admin/me');
            if(response.status == 200) setIsAdmin(true);
        } catch (error) {
            console.log("You are not an admin");
            navigate('/login');
        }
    }

    useEffect(()=>{
        if(!user){
            navigate('/login');
        }
        checkAdmin();
    },[user]);

    const handleBannerUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setUploadSuccess(false);

        const formData = new FormData();
        formData.append('bannerImage', file);

        try {
            const response = await fetch('/api/multer/banner', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setUploadSuccess(true);
                setTimeout(() => setUploadSuccess(false), 3000);
            }
        } catch (error) {
            console.error('Error uploading banner:', error);
        } finally {
            setUploading(false);
        }
    }

    if(!isAdmin) {
        return (
            <div className="min-h-screen bg-[var(--color-bg-primary)] flex items-center justify-center px-4">
                <div className="card p-8 text-center max-w-md">
                    <h2 className="text-2xl font-bold text-[var(--color-error)] mb-2">Access Denied</h2>
                    <p className="text-[var(--color-text-secondary)]">Only admins can access this page</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[var(--color-bg-primary)]">
            <div className="page-shell section-gap">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold heading-gradient mb-2">
                        Admin Dashboard
                    </h1>
                    <p className="text-[var(--color-text-secondary)]">Manage your store settings and content</p>
                </div>

                {/* Banner Upload Card */}
                <div className="card p-8 md:p-12 max-w-2xl">
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
                                Update Banner
                            </h2>
                            <p className="text-[var(--color-text-secondary)]">
                                Upload a new banner image for the homepage
                            </p>
                        </div>

                        {/* Upload Area */}
                        <label className="block">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleBannerUpload}
                                disabled={uploading}
                                className="hidden"
                            />
                            <div className="border-2 border-dashed border-[var(--color-primary-light)] rounded-lg p-8 cursor-pointer hover:border-[var(--color-primary-dark)] hover:bg-[var(--color-primary-light)]/5 transition-all">
                                <div className="flex flex-col items-center gap-4">
                                    <CloudArrowUpIcon className="w-12 h-12 text-[var(--color-primary-light)]" />
                                    <div className="text-center">
                                        <p className="font-semibold text-[var(--color-text-primary)]">
                                            {uploading ? 'Uploading...' : 'Click to upload banner image'}
                                        </p>
                                        <p className="text-sm text-[var(--color-text-secondary)] mt-2">
                                            PNG, JPG, GIF up to 10MB
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </label>

                        {/* Success Message */}
                        {uploadSuccess && (
                            <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-green-700">
                                ✓ Banner uploaded successfully!
                            </div>
                        )}

                        {/* Info Box */}
                        <div className="p-4 rounded-lg bg-[var(--color-primary-light)]/10 border border-[var(--color-primary-light)]/30">
                            <p className="text-sm text-[var(--color-text-secondary)]">
                                <strong>Recommended size:</strong> 1200 x 600 pixels (16:9 aspect ratio)
                            </p>
                        </div>
                    </div>
                </div>

                {/* Additional Stats/Info Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                    <div className="card p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-[var(--color-primary-soft)] border border-[var(--color-primary-light)] flex items-center justify-center">
                                <span className="text-2xl">📦</span>
                            </div>
                            <div>
                                <p className="text-[var(--color-text-light)] text-sm">Total Products</p>
                                <p className="text-2xl font-bold text-[var(--color-text-primary)]">Coming Soon</p>
                            </div>
                        </div>
                    </div>

                    <div className="card p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-[var(--color-primary-soft)] border border-[var(--color-primary-light)] flex items-center justify-center">
                                <span className="text-2xl">👥</span>
                            </div>
                            <div>
                                <p className="text-[var(--color-text-light)] text-sm">Total Users</p>
                                <p className="text-2xl font-bold text-[var(--color-text-primary)]">Coming Soon</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard