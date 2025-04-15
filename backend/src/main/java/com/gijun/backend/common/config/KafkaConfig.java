package com.gijun.backend.common.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaConfig {

    @Bean
    public NewTopic campaignTopic() {
        return TopicBuilder.name("campaigns")
                .partitions(3)
                .replicas(1)
                .build();
    }

    @Bean
    public NewTopic applicationTopic() {
        return TopicBuilder.name("applications")
                .partitions(3)
                .replicas(1)
                .build();
    }

    @Bean
    public NewTopic reviewTopic() {
        return TopicBuilder.name("reviews")
                .partitions(3)
                .replicas(1)
                .build();
    }
}
