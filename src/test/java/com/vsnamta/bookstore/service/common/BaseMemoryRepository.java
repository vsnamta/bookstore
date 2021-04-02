package com.vsnamta.bookstore.service.common;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.util.ReflectionUtils;

public abstract class BaseMemoryRepository<T> {
    private Map<Long, T> map = new HashMap<>();

    private Long idSeq = 0L;

    public T save(T object) {
        Long id = nextId();

        writeId(object, id);

        map.put(id, object);

        return object;
    }

    private Long nextId() {
        return ++idSeq;
    }

    private void writeId(T object, Long id) {
        Field field = ReflectionUtils.findField(object.getClass(), "id");

        ReflectionUtils.makeAccessible(field);

        ReflectionUtils.setField(field, object, id);
    }

    public Optional<T> findById(Long id) {
        return Optional.ofNullable(map.get(id));
    }

    protected Map<Long, T> getMap() {
        return map;
    }
}