package com.hollywood.fptu_cinema;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.awt.*;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

@EnableScheduling
@SpringBootApplication()
public class FptuCinemaApplication {

    public static void main(String[] args) {
        SpringApplication.run(FptuCinemaApplication.class, args);
    }

    @EventListener(ApplicationReadyEvent.class)
    public void openBrowserAfterStartup() {
        String url = "http://localhost:8080/swagger-ui/index.html";
        if (Desktop.isDesktopSupported()) {
            Desktop desktop = Desktop.getDesktop();
            if (desktop.isSupported(Desktop.Action.BROWSE)) {
                try {
                    desktop.browse(new URI(url));
                } catch (IOException | URISyntaxException e) {
                    e.printStackTrace();
                }
            }
        } else {
            String os = System.getProperty("os.name").toLowerCase();
            Runtime runtime = Runtime.getRuntime();
            try {
                if (os.contains("win")) {
                    runtime.exec("rundll32 url.dll,FileProtocolHandler " + url);
                } else if (os.contains("mac")) {
                    runtime.exec("open " + url);
                } else if (os.contains("nix") || os.contains("nux")) {
                    String[] browsers = {"epiphany", "firefox", "mozilla", "konqueror",
                            "netscape", "opera", "links", "lynx"};

                    StringBuffer cmd = new StringBuffer();
                    for (int i = 0; i < browsers.length; i++)
                        cmd.append((i == 0 ? "" : " || ") + browsers[i] + " \"" + url + "\" ");

                    runtime.exec(new String[]{"sh", "-c", cmd.toString()});
                } else {
                    throw new UnsupportedOperationException("Unsupported operating system.");
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
