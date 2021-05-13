package io.github.mrt_map.mappy;

import javax.security.auth.login.LoginException;

import lombok.Getter;
import net.dv8tion.jda.api.JDABuilder;
import net.dv8tion.jda.api.requests.GatewayIntent;

public class Mappy {

    public Mappy(String token) throws LoginException {
        JDABuilder jda = JDABuilder.create(token, GatewayIntent.GUILD_MEMBERS, GatewayIntent.GUILD_MESSAGES);

        jda.build();
    }
    @SuppressWarnings("unused")
    public static void main(String[] args) throws LoginException {
        new Mappy(args[0]); // Init with token
    }
}
