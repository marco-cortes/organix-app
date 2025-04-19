pipeline {
    agent any

    environment {
        IMAGE_NAME = "organix-app"
        LOCAL_REGISTRY = "localhost:5000"
        GIT_CREDENTIALS = "github-credentials"
        HOST_DEV = "localhost:3000"
        HOST_PROD = "187.33.150.229"
        PORT = "30000"


        IMAGE_NAME = "organix-app"
        PORT_SERVICE = "80"
        PORT_CONTAINER = "30000"
        HOST_REGISTRY = "localhost:5000"
        HOST_DEV = "http://localhost:3000"
        HOST_PROD = "http://187.33.150.229:${PORT_CONTAINER}"

    }

    stages {
        stage('Clonar Repositorio') {
            steps {
                git credentialsId: "${env.GIT_CREDENTIALS}", url: 'https://github.com/marco-cortes/organix-app.git', branch: 'main'
            }
        }

        stage('Reemplazar URL en rspack.config.ts') {
            steps {
                script {
                    sh """
                        if [ -f rspack.config.ts ]; then
                            cp rspack.config.ts rspack.config.ts.bak
                            sed -i 's|"${env.HOST_DEV}"|"${env.HOST_PROD}"|g' rspack.config.ts
                        fi
                    """
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    def imageTag = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
                    env.IMAGE_TAG = imageTag
                    def fullImage = "${HOST_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}"
                    
                    sh "docker build -t ${fullImage} ."
                    sh "docker push ${fullImage}"
                }
            }
        }

        stage('Deploy en Kubernetes') {
            steps {
                script {
                    sh """
                        export HOST_REGISTRY=${HOST_REGISTRY}
                        export IMAGE_NAME=${IMAGE_NAME}
                        export IMAGE_TAG=${IMAGE_TAG}
                        export PORT_CONTAINER=${PORT_CONTAINER}
                        export PORT_SERVICE=${PORT_SERVICE}
                        export HOST_PROD=${HOST_PROD}

                        envsubst < k8s/deployment.yaml | kubectl apply -f -
                        envsubst < k8s/service.yaml | kubectl apply -f -

                        kubectl delete pod -l app=${IMAGE_NAME} --ignore-not-found
                    """
                }
            }
        }
        
        stage('Limpiar imágenes Docker antiguas') {
            steps {
                script {
                    sh """
                        docker images "${LOCAL_REGISTRY}/${IMAGE_NAME}" --format "{{.Repository}}:{{.Tag}} {{.CreatedAt}}" \\
                        | sort -r \\
                        | tail -n +6 \\
                        | awk '{print \$1}' \\
                        | xargs -r docker rmi
                    """
                }
            }
        }

        stage('Restaurar rspack.config.ts') {
            steps {
                script {
                    sh '''
                        if [ -f rspack.config.ts.bak ]; then
                            mv rspack.config.ts.bak rspack.config.ts
                        fi
                    '''
                }
            }
        }
    }
}
