<!--
  -- systemboard
  -- Copyright (C) 2020 Ben Swierzy
  --
  -- This program is free software: you can redistribute it and/or modify
  -- it under the terms of the GNU General Public License as published by
  -- the Free Software Foundation, either version 3 of the License, or
  -- (at your option) any later version.
  --
  -- This program is distributed in the hope that it will be useful,
  -- but WITHOUT ANY WARRANTY; without even the implied warranty of
  -- MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  -- GNU General Public License for more details.
  --
  -- You should have received a copy of the GNU General Public License
  -- along with this program.  If not, see <https://www.gnu.org/licenses/>.
  --
  -->

<template>
  <div style="color: white; background-color: black">
    <div class="text-center p-4 mb-5">
      <div @click="$router.push('/')" class="cursor-pointer">
        <img src="/dev/favicon.png" alt="" />
        <h1 class="display-1">Digitales Bouldersystem</h1>
      </div>
      <h2>Datenschutzerklärung</h2>
    </div>
  </div>
  <article class="container">
    <div class="row bg-white">
      <h3>I. Name und Anschrift des Verantwortlichen</h3>
      <p>
        Der Verantwortliche im Sinne der Datenschutz-Grundverordnung und anderer nationaler Datenschutzgesetze der
        Mitgliedsstaaten sowie sonstiger datenschutzrechtlicher Bestimmungen ist:
        <br />
        {{ name }}<br />
        {{ street }}<br />
        {{ pcode }} {{ city }}<br />
        {{ country }}<br />
        E-Mail: <span v-html="email"></span>
      </p>

      <h3>II. Allgemeines zur Datenverarbeitung</h3>
      <h4>1. Umfang der Verarbeitung personenbezogener Daten</h4>
      <p>
        Wir verarbeiten personenbezogene Daten unserer Nutzer grundsätzlich nur, soweit dies zur Bereitstellung einer
        funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist. Die Verarbeitung
        personenbezogener Daten unserer Nutzer erfolgt regelmäßig nur nach Einwilligung des Nutzers. Eine Ausnahme gilt
        in solchen Fällen, in denen eine vorherige Einholung einer Einwilligung aus tatsächlichen Gründen nicht möglich
        ist und die Verarbeitung der Daten durch gesetzliche Vorschriften gestattet ist.
      </p>

      <h4>2. Rechtsgrundlage für die Verarbeitung personenbezogener Daten</h4>
      <p>
        Soweit wir für Verarbeitungsvorgänge personenbezogener Daten eine Einwilligung der betroffenen Person einholen,
        dient Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;a EU-Datenschutzgrundverordnung (DSGVO) als Rechtsgrundlage. Bei der
        Verarbeitung von personenbezogenen Daten, die zur Erfüllung eines Vertrages, dessen Vertragspartei die
        betroffene Person ist, erforderlich ist, dient Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;b DSGVO als Rechtsgrundlage.
        Dies gilt auch für Verarbeitungsvorgänge, die zur Durchführung vorvertraglicher Maßnahmen erforderlich sind.
        Soweit eine Verarbeitung personenbezogener Daten zur Erfüllung einer rechtlichen Verpflichtung erforderlich ist,
        der unser Unternehmen unterliegt, dient Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;c DSGVO als Rechtsgrundlage. Für den
        Fall, dass lebenswichtige Interessen der betroffenen Person oder einer anderen natürlichen Person eine
        Verarbeitung personenbezogener Daten erforderlich machen, dient Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;d DSGVO als
        Rechtsgrundlage. Ist die Verarbeitung zur Wahrung eines berechtigten Interesses unseres Unternehmens oder eines
        Dritten erforderlich und überwiegen die Interessen, Grundrechte und Grundfreiheiten des Betroffenen das
        erstgenannte Interesse nicht, so dient Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DSGVO als Rechtsgrundlage für die
        Verarbeitung.
      </p>
      <h4>3. Datenlöschung und Speicherdauer</h4>
      <p>
        Die personenbezogenen Daten der betroffenen Person werden gelöscht oder gesperrt, sobald der Zweck der
        Speicherung entfällt. Eine Speicherung kann darüber hinaus erfolgen, wenn dies durch den europäischen oder
        nationalen Gesetzgeber in unionsrechtlichen Verordnungen, Gesetzen oder sonstigen Vorschriften, denen der
        Verantwortliche unterliegt, vorgesehen wurde. Eine Sperrung oder Löschung der Daten erfolgt auch dann, wenn eine
        durch die genannten Normen vorgeschriebene Speicherfrist abläuft, es sei denn, dass eine Erforderlichkeit zur
        weiteren Speicherung der Daten für einen Vertragsabschluss oder eine Vertragserfüllung besteht.
      </p>

      <h3>III. Bereitstellung der Website und Erstellung von Logfiles</h3>
      <h4>4. Beschreibung und Umfang der Datenverarbeitung</h4>
      <p>
        Bei jedem Aufruf unserer Internetseite erfasst unser System automatisiert Daten und Informationen vom
        Computersystem des aufrufenden Rechners. Folgende Daten werden hierbei erhoben:
      </p>
      <ol>
        <li>Informationen über den Browsertyp und die verwendete Version</li>
        <li>Das Betriebssystem des Nutzers</li>
        <li>Die IP-Adresse des Nutzers</li>
        <li>Datum und Uhrzeit des Zugriffs</li>
      </ol>
      <p>
        Die Daten werden ebenfalls in den Logfiles unseres Systems gespeichert. Nicht hiervon betroffen sind hierbei
        IP-Adressen des Nutzers oder andere Daten, die die Zuordnung der Daten zu einem Nutzer ermöglichen. Eine
        Speicherung dieser Daten zusammen mit anderen personenbezogenen Daten des Nutzers findet nicht statt.
      </p>

      <h4>5. Rechtsgrundlage für die Datenverarbeitung</h4>
      <p>Rechtsgrundlage für die vorübergehende Speicherung der Daten ist Art. 6 Abs. 1 lit. f DSGVO.</p>

      <h4>6. Zweck der Datenverarbeitung</h4>
      <p>
        Die vorübergehende Speicherung der IP-Adresse durch das System ist notwendig, um eine Auslieferung der Website
        an den Rechner des Nutzers zu ermöglichen. Hierfür muss die IP-Adresse des Nutzers für die Dauer der Sitzung
        gespeichert bleiben. In diesen Zwecken liegt auch unser berechtigtes Interesse an der Datenverarbeitung nach
        Art. 6 Abs. 1 lit. f DSGVO.
      </p>

      <h4>7. Dauer der Speicherung</h4>
      <p>
        Die Daten werden gelöscht, sobald sie für die Erreichung des Zweckes ihrer Erhebung nicht mehr erforderlich
        sind. Im Falle der Erfassung der Daten zur Bereitstellung der Website ist dies der Fall, wenn die jeweilige
        Sitzung beendet ist.
      </p>

      <h4>8. Widerspruchs- und Beseitigungsmöglichkeit</h4>
      <p>
        Die Erfassung der Daten zur Bereitstellung der Website und die Speicherung der Daten in Logfiles ist für den
        Betrieb der Internetseite zwingend erforderlich. Es besteht folglich seitens des Nutzers keine
        Widerspruchsmöglichkeit
      </p>
      <h3>IV. Verwendung von Cookies</h3>
      <h4>9. Beschreibung und Umfang der Datenverarbeitung</h4>
      <p>
        Unsere Webseite verwendet Cookies. Bei Cookies handelt es sich um Textdateien, die im Internetbrowser bzw. vom
        Internetbrowser auf dem Computersystem des Nutzers gespeichert werden. Ruft ein Nutzer eine Website auf, so kann
        ein Cookie auf dem Betriebssystem des Nutzers gespeichert werden. Dieser Cookie enthält eine charakteristische
        Zeichenfolge, die eine eindeutige Identifizierung des Browsers beim erneuten Aufrufen der Website ermöglicht.
        Wir setzen Cookies ein, um unsere Website nutzerfreundlicher zu gestalten. Einige Elemente unserer Internetseite
        erfordern es, dass der aufrufende Browser auch nach einem Seitenwechsel identifiziert werden kann. In den
        Cookies werden dabei folgende Daten gespeichert und übermittelt:
      </p>
      <ol>
        <li>Sitzungskennung</li>
      </ol>

      <h4>10. Rechtsgrundlage für die Datenverarbeitung</h4>
      <p>
        Die Rechtsgrundlage für die Verarbeitung personenbezogener Daten unter Verwendung von Cookies ist Art. 6 Abs. 1
        lit. f DSGVO.
      </p>

      <h4>11. Zweck der Datenverarbeitung</h4>
      <p>
        Der Zweck der Verwendung technisch notwendiger Cookies ist, die Nutzung von Websites für die Nutzer zu
        vereinfachen. Einige Funktionen unserer Internetseite können ohne den Einsatz von Cookies nicht angeboten
        werden. Für diese ist es erforderlich, dass der Browser auch nach einem Seitenwechsel wiedererkannt wird. Für
        folgende Anwendungen benötigen wir Cookies:
      </p>
      <ol>
        <li>Merken des Login-Status</li>
      </ol>
      <p>
        Die durch technisch notwendige Cookies erhobenen Nutzerdaten werden nicht zur Erstellung von Nutzerprofilen
        verwendet. In diesen Zwecken liegt auch unser berechtigtes Interesse in der Verarbeitung der personenbezogenen
        Daten nach Art. 6 Abs. 1 lit. f DSGVO.
      </p>

      <h4>12. Dauer der Speicherung, Widerspruchs- und Beseitigunsmöglichkeit</h4>
      <p>
        Cookies werden auf dem Rechner des Nutzers gespeichert und von diesem an unserer Seite übermittelt. Daher haben
        Sie als Nutzer auch die volle Kontrolle über die Verwendung von Cookies. Durch eine Änderung der Einstellungen
        in Ihrem Internetbrowser können Sie die Übertragung von Cookies deaktivieren oder einschränken. Bereits
        gespeicherte Cookies können jederzeit gelöscht werden. Dies kann auch automatisiert erfolgen. Werden Cookies für
        unsere Website deaktiviert, können möglicherweise nicht mehr alle Funktionen der Website vollumfänglich genutzt
        werden.
      </p>
      <h3>V. Registrierung</h3>
      <h4>13. Beschreibung und Umfang der Datenverarbeitung</h4>
      <p>
        Auf unserer Internetseite bieten wir Nutzern die Möglichkeit, sich unter Angabe personenbezogener Daten zu
        registrieren. Die Daten werden dabei in eine Eingabemaske eingegeben und an uns übermittelt und gespeichert.
        Eine Weitergabe der Daten an Dritte findet nicht statt. Folgende Daten werden im Rahmen des
        Registrierungsprozesses erhoben:
      </p>
      <ol>
        <li>E-Mail Adresse des Nutzers</li>
        <li>Name des Nutzers</li>
      </ol>
      <p>
        Im Rahmen des Registrierungsprozesses wird eine Einwilligung des Nutzers zur Verarbeitung dieser Daten
        eingeholt.
      </p>

      <h4>14. Rechtsgrundlage für die Datenverarbeitung</h4>
      <p>
        Rechtsgrundlage für die Verarbeitung der Daten ist bei Vorliegen einer Einwilligung des Nutzers Art. 6 Abs. 1
        lit. a DSGVO.
      </p>

      <h4>15. Zweck der Datenverarbeitung</h4>
      <p>
        Eine Registrierung des Nutzers ist für das Bereithalten bestimmter Inhalte und Leistungen auf unserer Website
        erforderlich.
      </p>

      <h4>16. Dauer der Speicherung</h4>
      <p>
        Die Daten werden gelöscht, sobald sie für die Erreichung des Zweckes ihrer Erhebung nicht mehr erforderlich
        sind.
      </p>

      <h4>17. Widerspruchs- und Beseitigungsmöglichkeit</h4>
      <p>
        Als Nutzer haben sie jederzeit die Möglichkeit, die Registrierung aufzulösen. Die über Sie gespeicherten Daten
        können Sie jederzeit abändern lassen. Hierzu können Sie sich per E-Mail an <span v-html="email"></span> wenden.
      </p>
      <h3>VI. E-Mail Kontakt</h3>
      <h4>18. Beschreibung und Umfang der Datenverarbeitung</h4>
      <p>
        Eine Kontaktaufnahme ist über die bereitgestellte E-Mailadresse möglich. In diesem Fall werden die mit der
        E-Mail übermittelten personenbezogenen Daten des Nutzers gespeichert. Es erfolgt in diesem Zusammenhang keine
        Weitergabe der Daten an Dritte. Die Daten werden ausschließlich für die Verarbeitung der Konversation verwendet.
      </p>

      <h4>19. Rechtsgrundlage für die Datenverarbeitung</h4>
      <p>
        Rechtsgrundlage für die Verarbeitung der Daten, die im Zuge einer Übersendung einer E-Mail übermittelt werden,
        ist Art. 6 Abs. 1 lit. f DSGVO.
      </p>

      <h4>20. Zweck der Datenverarbeitung</h4>
      <p>
        Die Verarbeitung der personenbezogenen Daten dient uns allein zur Bearbeitung der Kontaktaufnahme. Hieran auch
        das erforderliche berechtigte Interesse an der Verarbeitung der Daten.
      </p>

      <h4>21. Dauer der Speicherung</h4>
      <p>
        Die Daten werden gelöscht, sobald sie für die Erreichung des Zweckes ihrer Erhebung nicht mehr erforderlich
        sind. Für die personenbezogenen Daten, die per E-Mail übersandt wurden, ist dies dann der Fall, wenn die
        jeweilige Konversation mit dem Nutzer beendet ist. Beendet ist die Konversation dann, wenn sich aus den
        Umständen entnehmen lässt, dass der betroffene Sachverhalt abschließend geklärt ist.
      </p>

      <h4>22. Widerspruchs- und Beseitigungsmöglichkeit</h4>
      <p>
        Der Nutzer kann der Speicherung seiner personenbezogenen Daten jederzeit widersprechen. In einem solchen Fall
        kann die Konversation nicht fortgeführt werden.
      </p>

      <h3>VII. Rechte der betroffenen Person</h3>
      <p>
        Werden personenbezogene Daten von Ihnen verarbeitet, sind Sie Betroffener i.S.d. DSGVO und es stehen Ihnen
        folgende Rechte gegenüber dem Verantwortlichen zu:
      </p>

      <h4>23. Auskunftsrecht</h4>
      <p>
        Sie können von dem Verantwortlichen eine Bestätigung darüber verlangen, ob personenbezogene Daten, die Sie
        betreffen, von uns verarbeitet werden. Liegt eine solche Verarbeitung vor, können Sie von dem Verantwortlichen
        über folgende Informationen Auskunft verlangen:
      </p>
      <ol>
        <li>die Zwecke, zu denen die personenbezogenen Daten verarbeitet werden;</li>
        <li>die Kategorien von personenbezogenen Daten, welche verarbeitet werden;</li>
        <li>
          die Empfänger bzw. die Kategorien von Empfängern, gegenüber denen die Sie betreffenden personenbezogenen Daten
          offengelegt wurden oder noch offengelegt werden;
        </li>
        <li>
          die geplante Dauer der Speicherung der Sie betreffenden personenbezogenen Daten oder, falls konkrete Angaben
          hierzu nicht möglich sind, Kriterien für die Festlegung der Speicherdauer;
        </li>
        <li>
          das Bestehen eines Rechts auf Berichtigung oder Löschung der Sie betreffenden personenbezogenen Daten, eines
          Rechts auf Einschränkung der Verarbeitung durch den Verantwortlichen oder eines Widerspruchsrechts gegen diese
          Verarbeitung;
        </li>
        <li>das Bestehen eines Beschwerderechts bei einer Aufsichtsbehörde;</li>
        <li>
          alle verfügbaren Informationen über die Herkunft der Daten, wenn die personenbezogenen Daten nicht bei der
          betroffenen Person erhoben werden;
        </li>
        <li>
          das Bestehen einer automatisierten Entscheidungsfindung einschließlich Profiling gemäß Art. 22 Abs. 1 und 4
          DSGVO und – zumindest in diesen Fällen – aussagekräftige Informationen über die involvierte Logik sowie die
          Tragweite und die angestrebten Auswirkungen einer derartigen Verarbeitung für die betroffene Person.
        </li>
      </ol>
      <p>
        Ihnen steht das Recht zu, Auskunft darüber zu verlangen, ob die Sie betreffenden personenbezogenen Daten in ein
        Drittland oder an eine internationale Organisation übermittelt werden. In diesem Zusammenhang können Sie
        verlangen, über die geeigneten Garantien gem. Art. 46 DSGVO im Zusammenhang mit der Übermittlung unterrichtet zu
        werden.
      </p>

      <h4>24. Recht auf Berichtigung</h4>
      <p>
        Sie haben ein Recht auf Berichtigung und/oder Vervollständigung gegenüber dem Verantwortlichen, sofern die
        verarbeiteten personenbezogenen Daten, die Sie betreffen, unrichtig oder unvollständig sind. Der Verantwortliche
        hat die Berichtigung unverzüglich vorzunehmen.
      </p>

      <h4>25. Recht auf Einschränkung der Verarbeitung</h4>
      <p>
        Unter den folgenden Voraussetzungen können Sie die Einschränkung der Verarbeitung der Sie betreffenden
        personenbezogenen Daten verlangen:
      </p>
      <ol>
        <li>
          wenn Sie die Richtigkeit der Sie betreffenden personenbezogenen für eine Dauer bestreiten, die es dem
          Verantwortlichen ermöglicht, die Richtigkeit der personenbezogenen Daten zu überprüfen;
        </li>
        <li>
          die Verarbeitung unrechtmäßig ist und Sie die Löschung der personenbezogenen Daten ablehnen und stattdessen
          die Einschränkung der Nutzung der personenbezogenen Daten verlangen;
        </li>
        <li>
          der Verantwortliche die personenbezogenen Daten für die Zwecke der Verarbeitung nicht länger benötigt, Sie
          diese jedoch zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen benötigen, oder
        </li>
        <li>
          wenn Sie Widerspruch gegen die Verarbeitung gemäß Art. 21 Abs. 1 DSGVO eingelegt haben und noch nicht
          feststeht, ob die berechtigten Gründe des Verantwortlichen gegenüber Ihren Gründen überwiegen.
        </li>
      </ol>
      <p>
        Wurde die Verarbeitung der Sie betreffenden personenbezogenen Daten eingeschränkt, dürfen diese Daten – von
        ihrer Speicherung abgesehen – nur mit Ihrer Einwilligung oder zur Geltendmachung, Ausübung oder Verteidigung von
        Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder juristischen Person oder aus Gründen
        eines wichtigen öffentlichen Interesses der Union oder eines Mitgliedstaats verarbeitet werden.
      </p>
      <p>
        Wurde die Einschränkung der Verarbeitung nach den o.g. Voraussetzungen eingeschränkt, werden Sie von dem
        Verantwortlichen unterrichtet bevor die Einschränkung aufgehoben wird.
      </p>

      <h4>26. Recht auf Löschung</h4>
      <h5>a) Löschungspflicht</h5>
      <p>
        Sie können von dem Verantwortlichen verlangen, dass die Sie betreffenden personenbezogenen Daten unverzüglich
        gelöscht werden, und der Verantwortliche ist verpflichtet, diese Daten unverzüglich zu löschen, sofern einer der
        folgenden Gründe zutrifft:
      </p>
      <ol>
        <li>
          Die Sie betreffenden personenbezogenen Daten sind für die Zwecke, für die sie erhoben oder auf sonstige Weise
          verarbeitet wurden, nicht mehr notwendig.
        </li>
        <li>
          Sie widerrufen Ihre Einwilligung, auf die sich die Verarbeitung gem. Art. 6 Abs. 1 lit. a oder Art. 9 Abs. 2
          lit. a DSGVO stützte, und es fehlt an einer anderweitigen Rechtsgrundlage für die Verarbeitung.
        </li>
        <li>
          Sie legen gem. Art. 21 Abs. 1 DSGVO Widerspruch gegen die Verarbeitung ein und es liegen keine vorrangigen
          berechtigten Gründe für die Verarbeitung vor, oder Sie legen gem. Art. 21 Abs. 2 DSGVO Widerspruch gegen die
          Verarbeitung ein.
        </li>
        <li>Die Sie betreffenden personenbezogenen Daten wurden unrechtmäßig verarbeitet.</li>
        <li>
          Die Löschung der Sie betreffenden personenbezogenen Daten ist zur Erfüllung einer rechtlichen Verpflichtung
          nach dem Unionsrecht oder dem Recht der Mitgliedstaaten erforderlich, dem der Verantwortliche unterliegt.
        </li>
        <li>
          Die Sie betreffenden personenbezogenen Daten wurden in Bezug auf angebotene Dienste der
          Informationsgesellschaft gemäß Art. 8 Abs. 1 DSGVO erhoben.
        </li>
      </ol>

      <h5>b) Informationen an Dritte</h5>
      <p>
        Hat der Verantwortliche die Sie betreffenden personenbezogenen Daten öffentlich gemacht und ist er gem. Art. 17
        Abs. 1 DSGVO zu deren Löschung verpflichtet, so trifft er unter Berücksichtigung der verfügbaren Technologie und
        der Implementierungskosten angemessene Maßnahmen, auch technischer Art, um für die Datenverarbeitung
        Verantwortliche, die die personenbezogenen Daten verarbeiten, darüber zu informieren, dass Sie als betroffene
        Person von ihnen die Löschung aller Links zu diesen personenbezogenen Daten oder von Kopien oder Replikationen
        dieser personenbezogenen Daten verlangt haben.
      </p>
      <h5>c) Ausnahmen</h5>
      <p>Das Recht auf Löschung besteht nicht, soweit die Verarbeitung erforderlich ist</p>
      <ol>
        <li>zur Ausübung des Rechts auf freie Meinungsäußerung und Information;</li>
        <li>
          zur Erfüllung einer rechtlichen Verpflichtung, die die Verarbeitung nach dem Recht der Union oder der
          Mitgliedstaaten, dem der Verantwortliche unterliegt, erfordert, oder zur Wahrnehmung einer Aufgabe, die im
          öffentlichen Interesse liegt oder in Ausübung öffentlicher Gewalt erfolgt, die dem Verantwortlichen übertragen
          wurde;
        </li>
        <li>
          aus Gründen des öffentlichen Interesses im Bereich der öffentlichen Gesundheit gemäß Art. 9 Abs. 2 lit. h und
          i sowie Art. 9 Abs. 3 DSGVO;
        </li>
        <li>
          für im öffentlichen Interesse liegende Archivzwecke, wissenschaftliche oder historische Forschungszwecke oder
          für statistische Zwecke gem. Art. 89 Abs. 1 DSGVO, soweit das unter Abschnitt a) genannte Recht
          voraussichtlich die Verwirklichung der Ziele dieser Verarbeitung unmöglich macht oder ernsthaft
          beeinträchtigt, oder
        </li>
        <li>zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.</li>
      </ol>

      <h4>27. Recht auf Unterrichtung</h4>
      <p>
        Haben Sie das Recht auf Berichtigung, Löschung oder Einschränkung der Verarbeitung gegenüber dem
        Verantwortlichen geltend gemacht, ist dieser verpflichtet, allen Empfängern, denen die Sie betreffenden
        personenbezogenen Daten offengelegt wurden, diese Berichtigung oder Löschung der Daten oder Einschränkung der
        Verarbeitung mitzuteilen, es sei denn, dies erweist sich als unmöglich oder ist mit einem unverhältnismäßigen
        Aufwand verbunden. Ihnen steht gegenüber dem Verantwortlichen das Recht zu, über diese Empfänger unterrichtet zu
        werden.
      </p>

      <h4>28. Recht auf Datenübertragbarkeit</h4>
      <p>
        Sie haben das Recht, die Sie betreffenden personenbezogenen Daten, die Sie dem Verantwortlichen bereitgestellt
        haben, in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten. Außerdem haben Sie das Recht
        diese Daten einem anderen Verantwortlichen ohne Behinderung durch den Verantwortlichen, dem die
        personenbezogenen Daten bereitgestellt wurden, zu übermitteln, sofern
      </p>
      <ol>
        <li>
          die Verarbeitung auf einer Einwilligung gem. Art. 6 Abs. 1 lit. a DSGVO oder Art. 9 Abs. 2 lit. a DSGVO oder
          auf einem Vertrag gem. Art. 6 Abs. 1 lit. b DSGVO beruht und
        </li>
        <li>die Verarbeitung mithilfe automatisierter Verfahren erfolgt.</li>
      </ol>
      <p>
        In Ausübung dieses Rechts haben Sie ferner das Recht, zu erwirken, dass die Sie betreffenden personenbezogenen
        Daten direkt von einem Verantwortlichen einem anderen Verantwortlichen übermittelt werden, soweit dies technisch
        machbar ist. Freiheiten und Rechte anderer Personen dürfen hierdurch nicht beeinträchtigt werden.
      </p>
      <p>
        Das Recht auf Datenübertragbarkeit gilt nicht für eine Verarbeitung personenbezogener Daten, die für die
        Wahrnehmung einer Aufgabe erforderlich ist, die im öffentlichen Interesse liegt oder in Ausübung öffentlicher
        Gewalt erfolgt, die dem Verantwortlichen übertragen wurde.
      </p>

      <h4>29. Widerspruchsrecht</h4>
      <p>
        Sie haben das Recht, aus Gründen, die sich aus ihrer besonderen Situation ergeben, jederzeit gegen die
        Verarbeitung der Sie betreffenden personenbezogenen Daten, die aufgrund von Art. 6 Abs. 1 lit. e oder f DSGVO
        erfolgt, Widerspruch einzulegen; dies gilt auch für ein auf diese Bestimmungen gestütztes Profiling.
      </p>
      <p>
        Der Verantwortliche verarbeitet die Sie betreffenden personenbezogenen Daten nicht mehr, es sei denn, er kann
        zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten
        überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.
      </p>
      <p>
        Werden die Sie betreffenden personenbezogenen Daten verarbeitet, um Direktwerbung zu betreiben, haben Sie das
        Recht, jederzeit Widerspruch gegen die Verarbeitung der Sie betreffenden personenbezogenen Daten zum Zwecke
        derartiger Werbung einzulegen; dies gilt auch für das Profiling, soweit es mit solcher Direktwerbung in
        Verbindung steht.
      </p>
      <p>
        Widersprechen Sie der Verarbeitung für Zwecke der Direktwerbung, so werden die Sie betreffenden
        personenbezogenen Daten nicht mehr für diese Zwecke verarbeitet.
      </p>
      <p>
        Sie haben die Möglichkeit, im Zusammenhang mit der Nutzung von Diensten der Informationsgesellschaft –
        ungeachtet der Richtlinie 2002/58/ EG – Ihr Widerspruchsrecht mittels automatisierter Verfahren auszuüben, bei
        denen technische Spezifikationen verwendet werden.
      </p>

      <h4>30. Recht auf Widerruf der datenschutzrechtlichen Einwilligungserklärung</h4>
      <p>
        Sie haben das Recht, Ihre datenschutzrechtliche Einwilligungserklärung jederzeit zu widerrufen. Durch den
        Widerruf der Einwilligung wird die Rechtmäßigkeit der aufgrund der Einwilligung bis zum Widerruf erfolgten
        Verarbeitung nicht berührt.
      </p>

      <h4>31. Automatisierte Entscheidung im Einzelfall einschließlich Profiling</h4>
      <p>
        Sie haben das Recht, nicht einer ausschließlich auf einer automatisierten Verarbeitung – einschließlich
        Profiling – beruhenden Entscheidung unterworfen zu werden, die Ihnen gegenüber rechtliche Wirkung entfaltet oder
        Sie in ähnlicher Weise erheblich beeinträchtigt. Dies gilt nicht, wenn die Entscheidung
      </p>
      <ol>
        <li>
          für den Abschluss oder die Erfüllung eines Vertrags zwischen Ihnen und dem Verantwortlichen erforderlich ist,
        </li>
        <li>
          aufgrund von Rechtsvorschriften der Union oder der Mitgliedstaaten denen der Verantwortliche unterliegt,
          zulässig ist und diese Rechtsvorschriften angemessene Maßnahmen zur Wahrung Ihrer Rechte und Freiheiten sowie
          Ihrer berechtigten Interessen enthalten oder
        </li>
        <li>mit Ihrer ausdrücklichen Einwilligung erfolgt.</li>
      </ol>
      <p>
        Allerdings dürfen diese Entscheidungen nicht auf besonderen Kategorien personenbezogener Daten nach Art. 9 Abs.
        1 DSGVO beruhen, sofern nicht Art. 9 Abs. 2 lit. a oder g DSGVO gilt und angemessene Maßnahmen zum Schutz der
        Rechte und Freiheiten sowie Ihrer berechtigten Interessen getroffen wurden.
      </p>
      <p>
        Hinsichtlich der in (1) und (3) genannten Fälle trifft der Verantwortliche angemessene Maßnahmen, um die Rechte
        und Freiheiten sowie Ihre berechtigten Interessen zu wahren, wozu mindestens das Recht auf Erwirkung des
        Eingreifens einer Person seitens des Verantwortlichen, auf Darlegung des eigenen Standpunkts und auf Anfechtung
        der Entscheidung gehört.
      </p>

      <h4>32. Recht auf Beschwerde bei einer Aufsichtsbehörde</h4>
      <p>
        Unbeschadet eines anderweitigen verwaltungsrechtlichen oder gerichtlichen Rechtsbehelfs steht Ihnen das Recht
        auf Beschwerde bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres Aufenthaltsorts, ihres
        Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes, zu, wenn Sie der Ansicht sind, dass die Verarbeitung
        der Sie betreffenden personenbezogenen Daten gegen die DSGVO verstößt.
      </p>
      <p>
        Die Aufsichtsbehörde, bei der die Beschwerde eingereicht wurde, unterrichtet den Beschwerdeführer über den Stand
        und die Ergebnisse der Beschwerde einschließlich der Möglichkeit eines gerichtlichen Rechtsbehelfs nach Art. 78
        DSGVO.
      </p>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GDPR",
  setup() {
    return {
      name: process.env.VUE_APP_PERSONAL_NAME ?? "",
      street: process.env.VUE_APP_PERSONAL_STREET ?? "",
      pcode: process.env.VUE_APP_PERSONAL_PCODE ?? "",
      city: process.env.VUE_APP_PERSONAL_CITY ?? "",
      country: process.env.VUE_APP_PERSONAL_COUNTRY ?? "",
      email: process.env.VUE_APP_PERSONAL_EMAIL ?? "",
    };
  },
});
</script>

<style scoped lang="scss"></style>
