package com.processpuzzle.core.application;

import javax.annotation.PreDestroy;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ProcessPuzzleCoreApplication {
   private static Logger logger = LoggerFactory.getLogger( ProcessPuzzleCoreApplication.class );

   public static void main( String[] args ) {
      logger.info( "About to start ProcessPuzzle-Core." );
      SpringApplication.run( ProcessPuzzleCoreApplication.class, args );
   }

   @PreDestroy
   public void shutDown() {
      logger.info( "About to stop ProcessPuzzle-Core." );
   }
}
