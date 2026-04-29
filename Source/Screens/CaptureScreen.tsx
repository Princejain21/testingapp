import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    SafeAreaView,
    Platform,
} from 'react-native';
import {
    Camera,
    useCameraDevices,
    CameraPosition,
} from 'react-native-vision-camera';
import { useNavigation, useRoute } from '@react-navigation/native';
import Svg, { Path, Circle } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const CaptureScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { overlayImage } = route.params;

    const devices = useCameraDevices();
    const device = devices.back;

    const [hasPermission, setHasPermission] = useState(false);
    const [flash, setFlash] = useState<'off' | 'on'>('off');
    const [zoom, setZoom] = useState(1);
    const camera = useRef<Camera>(null);

    useEffect(() => {
        (async () => {
            const status = await Camera.requestCameraPermission();
            setHasPermission(status === 'authorized');
        })();
    }, []);

    const handleCapture = async () => {
        // In a real app, we would take a photo here
        // For this task, we go back to the previous screen as requested
        navigation.goBack();
    };

    if (device == null || !hasPermission) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading Camera...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Camera View */}
            <Camera
                ref={camera}
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                photo={true}
                flash={flash}
                zoom={zoom}
            />

            {/* Uploaded Image Overlay */}
            <Image
                source={{ uri: overlayImage }}
                style={styles.overlayImage}
                pointerEvents="none"
            />

            {/* Top Controls */}
            <View style={styles.topContainer}>
                <TouchableOpacity style={styles.iconButton}>
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <Path
                            d="M3 6H21M3 12H15M3 18H21"
                            stroke="#FFF"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </Svg>
                    <Text style={styles.iconLabel}>Overview</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.flashButton}
                    onPress={() => setFlash(flash === 'on' ? 'off' : 'on')}
                >
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <Path
                            d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                            stroke="#FFF"
                            strokeWidth="2"
                            strokeLinejoin="round"
                        />
                        {flash === 'off' && (
                            <Path d="M2 2L22 22" stroke="#FFF" strokeWidth="2" />
                        )}
                    </Svg>
                </TouchableOpacity>
            </View>

            {/* Bottom Controls */}
            <View style={styles.bottomContainer}>
                {/* Zoom Controls */}
                <View style={styles.zoomContainer}>
                    <TouchableOpacity
                        style={[styles.zoomItem, zoom === 0.5 && styles.activeZoom]}
                        onPress={() => setZoom(0.5)}
                    >
                        <Text style={styles.zoomText}>.5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.zoomItem, zoom === 1 && styles.activeZoom]}
                        onPress={() => setZoom(1)}
                    >
                        <Text style={styles.zoomText}>1x</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.zoomItem, zoom === 3 && styles.activeZoom]}
                        onPress={() => setZoom(3)}
                    >
                        <Text style={styles.zoomText}>3</Text>
                    </TouchableOpacity>
                </View>

                {/* Capture Button */}
                <TouchableOpacity style={styles.captureButtonOuter} onPress={handleCapture}>
                    <View style={styles.captureButtonInner}>
                        <Text style={styles.captureCount}>1/10</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    loadingText: {
        color: '#FFF',
        fontSize: 16,
    },
    overlayImage: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.5, // Transparency for overlay
        tintColor: '#4ADE80', // Green tint to match the vehicle lines in reference
        resizeMode: 'contain',
    },
    topContainer: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 50 : 30,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconButton: {
        alignItems: 'center',
    },
    iconLabel: {
        color: '#FFF',
        fontSize: 10,
        marginTop: 4,
        fontWeight: '600',
    },
    flashButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 40,
        width: '100%',
        alignItems: 'center',
    },
    zoomContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        padding: 4,
        marginBottom: 20,
    },
    zoomItem: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    activeZoom: {
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    zoomText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '600',
    },
    captureButtonOuter: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderWidth: 4,
        borderColor: '#4ADE80',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    captureButtonInner: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#4ADE80',
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureCount: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CaptureScreen;
