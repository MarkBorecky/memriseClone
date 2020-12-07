package com.example.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.example.web.rest.TestUtil;

public class UserItemTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserItem.class);
        UserItem userItem1 = new UserItem();
        userItem1.setId(1L);
        UserItem userItem2 = new UserItem();
        userItem2.setId(userItem1.getId());
        assertThat(userItem1).isEqualTo(userItem2);
        userItem2.setId(2L);
        assertThat(userItem1).isNotEqualTo(userItem2);
        userItem1.setId(null);
        assertThat(userItem1).isNotEqualTo(userItem2);
    }
}
