import React, { useState, useRef, useEffect, useCallback } from 'react';
import { CloseIcon } from './icons/CloseIcon';
import { TextIcon } from './icons/TextIcon';
import { MusicIcon } from './icons/MusicIcon';
import { MicrophoneIcon } from './icons/MicrophoneIcon';
import { GalleryIcon } from './icons/GalleryIcon';
import { CameraSwitchIcon } from './icons/CameraSwitchIcon';

interface StoryCreatorProps {
  onClose: () => void;
  onAddStory: (mediaUrl: string) => void;
}

const StoryCreator: React.FC<StoryCreatorProps> = ({ onClose, onAddStory }) => {
    const [media, setMedia] = useState<string | null>(null);
    const [isCameraMode, setIsCameraMode] = useState(true);
    const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const cleanupCamera = useCallback(() => {
        if (videoRef.current?.srcObject) {
            (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
    }, []);

    useEffect(() => {
        const enableCamera = async () => {
            cleanupCamera();
            if (isCameraMode) {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ 
                        video: { facingMode: facingMode } 
                    });
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                } catch (err) {
                    console.error("Error accessing camera:", err);
                    alert("يرجى السماح بالوصول إلى الكاميرا.");
                    setIsCameraMode(false);
                }
            }
        };
        enableCamera();

        return cleanupCamera;
    }, [isCameraMode, facingMode, cleanupCamera]);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => setMedia(e.target.result as string);
            reader.readAsDataURL(event.target.files[0]);
            setIsCameraMode(false);
        }
    };

    const takePicture = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
            context?.drawImage(videoRef.current, 0, 0, videoRef.current.videoWidth, videoRef.current.videoHeight);
            setMedia(canvasRef.current.toDataURL('image/png'));
            setIsCameraMode(false);
        }
    };
    
    const toggleFacingMode = () => {
        setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
    }

  return (
    <div className="fixed inset-0 bg-dark z-50 flex flex-col p-4 animate-fade-in-up">
        {/* Header */}
        <div className="flex justify-between items-center text-white z-10">
            <button onClick={onClose} className="p-2 bg-black/30 rounded-full hover:bg-black/50"><CloseIcon /></button>
            {media && (
                <div className="flex space-x-4 space-x-reverse">
                    <button className="p-3 bg-black/30 rounded-full hover:bg-black/50"><TextIcon /></button>
                    <button className="p-3 bg-black/30 rounded-full hover:bg-black/50"><MicrophoneIcon /></button>
                    <button className="p-3 bg-black/30 rounded-full hover:bg-black/50"><MusicIcon /></button>
                </div>
            )}
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center">
            {media ? (
                <img src={media} alt="Story preview" className="max-h-full max-w-full object-contain rounded-lg"/>
            ) : isCameraMode ? (
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            ) : (
                 <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <p>اختر من المعرض</p>
                </div>
            )}
            <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Footer */}
        <div className="mt-auto z-10">
            {media ? (
                 <div className="flex justify-center">
                    <button onClick={() => onAddStory(media)} className="bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 px-10 rounded-full shadow-lg hover:scale-105 transition-transform">
                        مشاركة القصة
                    </button>
                </div>
            ) : (
                <div className="flex justify-around items-center">
                     <label className="p-3 bg-black/30 rounded-full hover:bg-black/50 cursor-pointer">
                        <GalleryIcon />
                        <input type="file" accept="image/*,video/*" onChange={handleFileUpload} className="hidden" />
                    </label>
                    <button onClick={takePicture} className="w-20 h-20 rounded-full bg-white/30 border-4 border-white flex items-center justify-center active:scale-95 transition-transform"></button>
                    <button onClick={toggleFacingMode} className="p-3 bg-black/30 rounded-full hover:bg-black/50"><CameraSwitchIcon /></button>
                </div>
            )}
        </div>
        
        <style>{`
        .animate-fade-in-up { animation: fadeInUp 0.4s ease-out; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default StoryCreator;