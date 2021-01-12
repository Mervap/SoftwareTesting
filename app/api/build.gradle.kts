import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
  id("org.springframework.boot") version "2.4.1"
  id("io.spring.dependency-management") version "1.0.10.RELEASE"
  id("org.asciidoctor.convert") version "2.4.0"
  id("org.hidetake.ssh") version "2.10.1"
  kotlin("jvm") version "1.4.21"
  kotlin("plugin.spring") version "1.4.21"
  kotlin("plugin.jpa") version "1.4.21"
  kotlin("plugin.allopen") version "1.4.21"
}

group = "ru.mervap"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_11

configurations {
  compileOnly {
    extendsFrom(configurations.annotationProcessor.get())
  }
}

repositories {
  mavenCentral()
}

extra["snippetsDir"] = file("build/generated-snippets")
extra["testcontainersVersion"] = "1.15.1"

dependencies {
  implementation("org.springframework.boot:spring-boot-starter-data-jpa")
  implementation("org.springframework.boot:spring-boot-starter-data-rest")
  implementation("org.springframework.boot:spring-boot-starter-jdbc")
  implementation("org.springframework.boot:spring-boot-starter-web")
  implementation("org.springframework.boot:spring-boot-starter-security")
  implementation("org.springframework.boot:spring-boot-starter-validation")
  implementation("org.springframework.boot:spring-boot-starter-thymeleaf")
  implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
  implementation("org.jetbrains.kotlin:kotlin-reflect")
  implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
  compileOnly("org.projectlombok:lombok")
  runtimeOnly("org.postgresql:postgresql")
  annotationProcessor("org.projectlombok:lombok")
  testImplementation("org.springframework.boot:spring-boot-starter-test")
  testImplementation("org.springframework.restdocs:spring-restdocs-mockmvc")
  testImplementation("org.springframework.security:spring-security-test")
  testImplementation("org.testcontainers:junit-jupiter")
  testImplementation("org.testcontainers:postgresql")
  testImplementation("com.fasterxml.jackson.module:jackson-module-kotlin")
}

dependencyManagement {
  imports {
    mavenBom("org.testcontainers:testcontainers-bom:${property("testcontainersVersion")}")
  }
}

tasks.withType<KotlinCompile> {
  kotlinOptions {
    freeCompilerArgs = listOf("-Xjsr305=strict")
    jvmTarget = "11"
  }
}

tasks.withType<Test> {
  useJUnitPlatform()
}

tasks.register("buildClient") {
  exec { commandLine("sh", "-c", "cd ../client && npm run build") }
}

tasks.withType<Copy>().named("processResources") {
  from("../client/build")
}

task("awsDeploy") {
  dependsOn("buildClient")
  dependsOn("processResources")
  dependsOn("bootJar")

  val awsHost = System.getenv("aws.host")
  val dbHost = System.getenv("rds.host")
  val dbUser = System.getenv("rds.user")
  val dbPassword = System.getenv("rds.pass")

  val awsRemote = remotes.create("awsRemote") {
    host = awsHost
    user = "ubuntu"
    passphrase = ""
    identity = File("aws.pem")
  }

  doLast {
    ssh.run(delegateClosureOf<org.hidetake.groovy.ssh.core.RunHandler> {
      session(awsRemote, delegateClosureOf<org.hidetake.groovy.ssh.session.SessionHandler> {
        logger.lifecycle("Killing existing jvms")
        execute("sudo killall java || true")

        logger.lifecycle("Create a directory")

        execute("rm -rf ~/app || true")
        execute("mkdir -p ~/app || true")

        val distDir = File(rootDir, "build/libs")

        logger.lifecycle("Copy bundle to host")

        put(
          hashMapOf(
            "from" to distDir.absolutePath,
            "into" to "/home/ubuntu/app",
            "fileTransfer" to "scp"
          )
        )

        logger.lifecycle("Run server...")

        execute("cd /home/ubuntu/app/libs; nohup sudo java -jar api-0.0.1-SNAPSHOT.jar --spring.datasource.url=$dbHost --spring.datasource.username=$dbUser --spring.datasource.password=$dbPassword --server.port=80 > /dev/null 2>&1 &")
      })
    })
  }
}

allOpen {
  annotation("javax.persistence.Entity")
  annotation("javax.persistence.Embeddable")
  annotation("javax.persistence.MappedSuperclass")
}