package com.ssafy.koala;

import org.jasypt.encryption.pbe.PooledPBEStringEncryptor;
import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.jasypt.encryption.pbe.config.SimpleStringPBEConfig;
import org.jasypt.iv.RandomIvGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;

import static org.junit.jupiter.api.Assertions.assertEquals;

class JasyptConfigAESTest {
    private static final String SECRET_KEY = "5578**!";
    @Test
    void stringEncryptor() {
        String url = "jdbc:mariadb://i10d212.p.ssafy.io:3327/s10p12d212_dev";
        String username = "root";
        String password = "firefist@@!";

        string_encryption(url);
        string_encryption(username);
        string_encryption(password);
    }

    void string_encryption(String input) {
        PooledPBEStringEncryptor encryptor = new PooledPBEStringEncryptor();
        SimpleStringPBEConfig config = new SimpleStringPBEConfig();
        config.setPassword(SECRET_KEY);
        config.setAlgorithm("PBEWithHMACSHA512AndAES_256");
        config.setIvGenerator(new RandomIvGenerator());
        config.setKeyObtentionIterations("1000");
        config.setPoolSize("1");
        config.setSaltGeneratorClassName("org.jasypt.salt.RandomSaltGenerator");
        config.setStringOutputType("base64");
        encryptor.setConfig(config);

        // 암호화
        String encryptedString = encryptor.encrypt(input);
        System.out.println("Encrypted String ::: ENC(" + encryptedString + ")");

        // 복호화
        String decryptedString = encryptor.decrypt(encryptedString);
        System.out.println("Decrypted String ::: " + decryptedString);

        assertEquals(input, decryptedString);
    }
}
