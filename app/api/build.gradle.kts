import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
  id("org.springframework.boot") version "2.4.0"
  id("io.spring.dependency-management") version "1.0.10.RELEASE"
  id("org.asciidoctor.convert") version "1.5.8"
  kotlin("jvm") version "1.4.10"
  kotlin("plugin.spring") version "1.4.10"
  kotlin("plugin.jpa") version "1.4.10"
  kotlin("plugin.allopen") version "1.4.10"
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
extra["testcontainersVersion"] = "1.15.0"

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

allOpen {
  annotation("javax.persistence.Entity")
  annotation("javax.persistence.Embeddable")
  annotation("javax.persistence.MappedSuperclass")
}