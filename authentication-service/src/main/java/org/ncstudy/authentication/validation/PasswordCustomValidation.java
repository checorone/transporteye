package org.ncstudy.authentication.validation;

import org.ncstudy.authentication.exceptions.AuthChangesException;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class PasswordCustomValidation {
    private static final int maxLength = 20, minLength = 8;

    public static void checkError(String password, String card_id) throws AuthChangesException {
        List<String> messages = new ArrayList<>();
        if (password.length() < minLength) {
            messages.add("Пароль должен содержать хотя бы " + minLength + " символов");
        } else if (password.length() > maxLength) {
            messages.add("Пароль должен быть не длиннее" + maxLength + " символов");
        }
        if (password.equals(card_id)) {
            messages.add("Пароль и ID карты не должны совпадать");
        }
        if (!password.matches(".*\\d.*")) {
            messages.add("Пароль должен содержать хотя бы 1 цифру");
        }
        if (!password.matches(".*[A-Za-z].*")) {
            messages.add("Необходимо использовать буквы латинского алфавита");
        } else {
            if (!password.matches(".*[A-Z].*")) {
                messages.add("Пароль должен содержать хотя бы 1 букву верхнего регистра");
            }
            if (!password.matches(".*[a-z].*")) {
                messages.add("Пароль должен содержать хотя бы 1 букву нижнего регистра");
            }
        }
        if (messages.size() > 0)
            throw new AuthChangesException(messages.stream().collect(Collectors.joining(",")));
    }
}
