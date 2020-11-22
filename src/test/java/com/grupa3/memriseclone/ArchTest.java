package com.grupa3.memriseclone;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("com.grupa3.memriseclone");

        noClasses()
            .that()
                .resideInAnyPackage("com.grupa3.memriseclone.service..")
            .or()
                .resideInAnyPackage("com.grupa3.memriseclone.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..com.grupa3.memriseclone.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}
