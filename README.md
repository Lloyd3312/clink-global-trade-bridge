# Clink Global Trade Bridge

Clink Global Trade Bridge is a responsive business platform connecting individuals, international buyers, businesses, suppliers, investors with opportunities and support services in Türkiye.

The platform provides product sourcing, supplier connections, trade consultation, real-estate guidance.

---

## Live Project

- **Live website:** To be added after production deployment
- **GitHub repository:** https://github.com/Lloyd3312/clink-global-trade-bridge


---

## Project Overview

International buyers may struggle to find verified suppliers, suitable properties, and reliable local support in Türkiye.

Clink Global Trade Bridge provides a central digital platform where users can request support with:

- international trade;
- supplier sourcing;
- exports from Türkiye;
- Turkish real estate;


---

## My Role

I worked as the **Project Owner and DevOps Engineer** for this project.

My responsibilities included:

- defining the project vision and business requirements;
- planning the website content and services;
- collaborating with Lovable for frontend generation and interface improvements;
- managing the source code using Git and GitHub;
- installing and validating application dependencies;
- creating the Dockerfile;
- building and testing Docker images;
- configuring GitHub Actions for continuous integration;
- securing Docker Hub authentication with GitHub Secrets;
- automatically building and publishing versioned Docker images;
- creating Kubernetes Deployment and Service resources;
- deploying the application to Minikube;
- validating Kubernetes pods, services, and deployments with `kubectl`;
- exposing the application locally with Kubernetes port forwarding;
- documenting the project and deployment process;
- preparing the application for public production deployment.

---

## Collaboration

The frontend interface and rapid design iterations were developed in collaboration with **Lovable**.

Project ownership, business requirements, DevOps implementation, Docker containerisation, CI pipeline, Kubernetes configuration, local deployment, testing, documentation, and production-deployment planning were completed by:

**Raymond Juwon Faromoh**

---

## Main Services

### International Trade and Product Sourcing

- Turkish manufacturer sourcing
- Supplier verification support
- Steel and industrial-product sourcing
- Fashion and textile sourcing
- Furniture and household-product sourcing
- Export and logistics coordination

### Real Estate Support

- Turkish property consultation
- Investment-property guidance
- Initial property sourcing support

---

## Technology Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui

### Backend and Data Services

- Supabase, where configured
- Environment-based application configuration

### DevOps

- Git
- GitHub
- GitHub Actions
- Docker
- Docker Hub
- Kubernetes
- Minikube
- kubectl

### Development Environment

- Visual Studio Code
- macOS
- Apple Silicon
- Docker Desktop

---

## Application Architecture

**Raymond Juwon Faromoh**
Project Owner / Developer
          |
          v
    GitHub Repository
          |
          v
   GitHub Actions CI
          |
          +---------------------------+
          |                           |
          v                           v
 Install Dependencies          Build Docker Image
          |                           |
          v                           v
 Build Vite Application        Docker Hub Registry
                                      |
                                      v
                              Minikube Kubernetes
                                      |
                                      v
                         Deployment and Service
                                      |
                                      v
                             Running Application
```

---

## Continuous Integration Pipeline

The GitHub Actions workflow runs automatically when code is pushed to the `main` branch.

The CI pipeline performs the following tasks:

1. Checks out the source code.
2. Configures the required Node.js version.
3. Installs dependencies using the project lock file.
4. Builds the React and Vite application.
5. Authenticates securely with Docker Hub.
6. Generates a version tag.
7. Builds the Docker image.
8. Tags the image as `latest` and with a version-specific tag.
9. Pushes the Docker images to Docker Hub.

Sensitive credentials are stored as encrypted GitHub repository secrets.

---

## Local Development

### Requirements

Install:

- Node.js
- npm
- Git

Clone the repository:

```bash
git clone https://github.com/Lloyd3312/clink-global-trade-bridge.git
```

Enter the project directory:

```bash
cd clink-global-trade-bridge
```

Install dependencies:

```bash
npm ci
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

---

## Docker

Build the Docker image:

```bash
docker build -t clink-global-trade-bridge:local .
```

Run the container:

```bash
docker run --rm -p 4173:4173 clink-global-trade-bridge:local
```

Open the application:

```text
http://localhost:4173
```

---

## Kubernetes Deployment

The application was deployed locally using Minikube.

Start Docker Desktop before running Minikube.

Start the cluster:

```bash
minikube start --driver=docker
```

Check the Kubernetes node:

```bash
kubectl get nodes
```

Apply the Kubernetes manifest:

```bash
kubectl apply -f k8s/deployment.yaml
```

Check all resources:

```bash
kubectl get all
```

Check the pods:

```bash
kubectl get pods
```

Check the deployment:

```bash
kubectl get deployments
```

Check the service:

```bash
kubectl get services
```

Expose the application locally:

```bash
kubectl port-forward service/lovable-service 8080:80
```

Open:

```text
http://localhost:8080
```

---

## Kubernetes Resources

The Kubernetes manifest contains:

### Deployment

The Deployment:

- creates and manages the application pod;
- pulls the application image from Docker Hub;
- maintains the requested replica count;
- restarts failed containers automatically;
- supports future rollout updates.

### Service

The Service:

- provides stable networking for the application;
- selects pods using Kubernetes labels;
- maps port `80` to the application container port;
- allows the application to be accessed through port forwarding.

---

## Troubleshooting

Check pod status:

```bash
kubectl get pods
```

Inspect a pod:

```bash
kubectl describe pod <pod-name>
```

View application logs:

```bash
kubectl logs <pod-name>
```

Check deployment rollout:

```bash
kubectl rollout status deployment/lovable-app
```

Restart the deployment:

```bash
kubectl rollout restart deployment/lovable-app
```

Check Minikube status:

```bash
minikube status
```

---

## Security Practices

- Docker credentials are stored in GitHub Secrets.
- Passwords and access tokens are not written directly in workflow files.
- Environment files containing sensitive values must not be committed.
- Production secrets should be provided through the hosting platform.
- Kubernetes Secrets should be used for sensitive cluster values.
- Payment-processing and property transaction results are not presented as guaranteed.

---

## Observability Roadmap

The next technical phase will introduce:

- Prometheus
- Grafana
- kube-state-metrics
- Kubernetes resource monitoring
- CPU and memory dashboards
- pod-health monitoring
- application metrics, where available
- alerts for failed or unavailable workloads

A `ServiceMonitor` will only be created after confirming that the application exposes a valid Prometheus-compatible metrics endpoint.

---

## Planned Improvements

- Deploy the website to a public production environment
- Connect a custom domain
- Enable HTTPS
- Configure domain-based business email
- Add monitoring with Prometheus and Grafana
- Add health and readiness probes
- Add Kubernetes resource requests and limits
- Use immutable image tags in Kubernetes
- Implement automated continuous deployment
- Introduce Terraform for infrastructure provisioning
- Evaluate Helm for Kubernetes packaging
- Evaluate Argo CD for GitOps deployment
- Add application analytics
- Add structured logging
- Improve backend enquiry management

---

## Important Observability Note

A Kubernetes `ServiceMonitor` does not generate metrics by itself.

It tells Prometheus where to collect metrics. The application must first expose a Prometheus-compatible endpoint such as:

```text
/metrics
```

Kubernetes infrastructure metrics can still be collected through components such as:

- kube-state-metrics;
- node exporters;
- Kubernetes API metrics;
- container resource metrics.

---

## Disclaimer

Clink Global Trade Bridge provides trade consultation and property-support services.

Property transactions, payment confirmation, and supplier agreements remain subject to the rules and decisions of the relevant banks, suppliers, property owners, and government authorities.

---

## Author

**Raymond Juwon Faromoh**

Project Owner and DevOps Engineer