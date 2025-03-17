// API Configuration for different environments

// Get the Minikube IP - you'll need to replace this with your actual Minikube IP
// You can get this by running 'minikube ip' in your terminal
const MINIKUBE_IP = '192.168.49.2'; // Replace with your actual Minikube IP

// Development environment with Kubernetes/Minikube
// This connects to your API gateway running in Minikube
const K8S_API_URL = `http://${MINIKUBE_IP}:30000`; // Adjust the port to match your API gateway NodePort

// Production environment
const PROD_API_URL = 'https://api.yourapp.com';

// Select the appropriate API URL based on environment
const getApiUrl = () => {
  if (__DEV__) {
    return K8S_API_URL;
  }
  return PROD_API_URL;
};

export const API_URL = getApiUrl();

// API endpoints
export const ENDPOINTS = {
  USER: '/api/users',
  AUTH: '/api/auth',
  // Add more endpoints as needed
};

// Export the Minikube IP for other uses (like connecting to Expo)
export const CLUSTER_IP = MINIKUBE_IP;
