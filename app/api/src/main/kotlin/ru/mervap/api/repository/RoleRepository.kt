package ru.mervap.api.repository

import org.springframework.data.repository.CrudRepository
import ru.mervap.api.entity.Role
import ru.mervap.api.entity.User

interface RoleRepository : CrudRepository<Role, Long>