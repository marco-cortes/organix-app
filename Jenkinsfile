pipeline {
    agent any

    environment {
        IMAGE_NAME = "organix-app"
        GIT_CREDENTIALS = 'github-credentials'
        CONTAINER_PORT = "31000"
        SERVICE_PORT = "80"
        REGISTRY_URL = "localhost:5000" 
        DEV_SERVER = "http://localhost:3000"
        PROD_SERVER = "http://187.33.150.229:${SERVICE_PORT}"
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
                            sed -i 's|"${env.DEV_SERVER}"|"${env.PROD_SERVER}"|g' rspack.config.ts
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
                    def fullImage = "${REGISTRY_URL}/${IMAGE_NAME}:${IMAGE_TAG}"
                    
                    sh "docker build -t ${fullImage} ."
                    sh "docker push ${fullImage}"
                }
            }
        }

        stage('Deploy en Kubernetes') {
            steps {
                script {
                    env.IMAGE_TAG = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()

                    sh """
                        export REGISTRY_URL=${REGISTRY_URL}
                        export IMAGE_NAME=${IMAGE_NAME}
                        export CONTAINER_PORT=${CONTAINER_PORT}
                        export SERVICE_PORT=${SERVICE_PORT}
                        export PROD_SERVER=${PROD_SERVER}

                        sed 's|IMAGE_TAG|${env.IMAGE_TAG}|g' k8s/deployment.yaml | envsubst | kubectl apply -f -

                        envsubst < k8s/service.yaml | kubectl apply -f -

                        kubectl delete pod -l app=${IMAGE_NAME} --ignore-not-found
                    """
                }
            }
        }

        // stage('Deploy en Kubernetes') {
        //     steps {
        //         script {
        //             // Aplicar deployment.yaml reemplazando IMAGE_TAG
        //             sh "sed 's|IMAGE_TAG|${env.IMAGE_TAG}|g' k8s/deployment.yaml | kubectl apply -f -"
        //             sh "kubectl apply -f k8s/service.yaml"

        //             // Borrar pods actuales para forzar reinicio
        //             sh "kubectl delete pod -l app=organix-app --ignore-not-found"
        //         }
        //     }
        // }
        
        stage('Limpiar imágenes Docker antiguas') {
            steps {
                script {
                    sh """
                        docker images "${REGISTRY_URL}/${IMAGE_NAME}" --format "{{.Repository}}:{{.Tag}} {{.CreatedAt}}" \\
                        | sort -r \\
                        | tail -n +6 \\
                        | awk '{print \$1}' \\
                        | xargs -r docker rmi
                    """
                }
            }
        }
    }
}
