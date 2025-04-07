const filePaths = [
  'b.txt',
  'coq.txt',
  'isabelle.txt',
  'riscal.txt',
  'tla.txt',
  'vdm.txt'
];

const languageMapping = {
  'b.txt': 'B',
  'coq.txt': 'Coq',
  'isabelle.txt': 'Isabelle',
  'riscal.txt': 'Riscal',
  'tla.txt': 'TLA',
  'vdm.txt': 'VDM'
};

const methodNameMapping = {
  'b.txt': 'B method',
  'coq.txt': 'Coq',
  'isabelle.txt': 'Isabelle/HOL',
  'riscal.txt': 'RISCAL',
  'tla.txt': 'TLA+',
  'vdm.txt': 'VDM'
};

const syntaxHighlightingRules = {
  B: {
    reserved: ["MACHINE", "CONSTRAINTS", "VARIABLES", "SEES", "INVARIANT", "INITIALISATION", "OPERATIONS", "END", "PRE", "BEGIN", "THEN", "SETS"],
    types: ["NAT", "NAT1", "FIN"],
    operators: ["∈", "≤", "⇒", ":=", "∅", "∪", "∉", "∧", "∨", " - ", "||", "←"],
    highlight: function (line) {
      function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      }

      const commentMatch = line.match(/\/\/.*/);
      if (commentMatch) {
        const commentIndex = commentMatch.index;
        let codeBeforeComment = line.slice(0, commentIndex);
        const commentText = line.slice(commentIndex);

        this.reserved.forEach(keyword => {
          const regex = new RegExp('\\b' + escapeRegExp(keyword) + '\\b', 'g');
          codeBeforeComment = codeBeforeComment.replace(regex, `<span class="b-reserved">${keyword}</span>`);
        });
        this.types.forEach(keyword => {
          const regex = new RegExp('\\b' + escapeRegExp(keyword) + '\\b', 'g');
          codeBeforeComment = codeBeforeComment.replace(regex, `<span class="type">${keyword}</span>`);
        });
        this.operators.forEach(op => {
          const regex = new RegExp(escapeRegExp(op), 'g');
          codeBeforeComment = codeBeforeComment.replace(regex, `<span class="b-operator">${op}</span>`);
        });

        return codeBeforeComment + `<span class="b-comment">${commentText}</span>`;
      } else {
        this.reserved.forEach(keyword => {
          const regex = new RegExp('\\b' + escapeRegExp(keyword) + '\\b', 'g');
          line = line.replace(regex, `<span class="b-reserved">${keyword}</span>`);
        });
        this.types.forEach(keyword => {
          const regex = new RegExp('\\b' + escapeRegExp(keyword) + '\\b', 'g');
          line = line.replace(regex, `<span class="type">${keyword}</span>`);
        });
        this.operators.forEach(op => {
          const regex = new RegExp(escapeRegExp(op), 'g');
          line = line.replace(regex, `<span class="b-operator">${op}</span>`);
        });
        return line;
      }
    }
  },

  Coq: {
    reserved: [
      "Require", "Import", "Export", "Section", "Inductive",
      "Definition", "Record", "Type", "list", "option",
      "true", "false", "Some", "None",
      "if", "then", "else", "match", "with", "fun", "end"
    ],
    operators: [
      "&&", "=>", ":=", "::", "<=?", "?=>", "|", "<?"
    ],
    types: ["nat", "bool", "seq"],
    highlight: function (line) {
      function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      }

      const commentMatch = line.match(/\(\*.*?\*\)/);
      if (commentMatch) {
        const commentIndex = commentMatch.index;
        let codeBeforeComment = line.slice(0, commentIndex);
        const commentText = line.slice(commentIndex);

        this.reserved.forEach(keyword => {
          const regex = new RegExp('\\b' + escapeRegExp(keyword) + '\\b', 'g');
          codeBeforeComment = codeBeforeComment.replace(regex, `<span class="coq-reserved">${keyword}</span>`);
        });

        this.operators.forEach(op => {
          const safeOp = op
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
          const regex = new RegExp(escapeRegExp(op), 'g');
          codeBeforeComment = codeBeforeComment.replace(regex, `<span class="coq-operator">${safeOp}</span>`);
        });

        this.types.forEach(keyword => {
          const regex = new RegExp('\\b' + escapeRegExp(keyword) + '\\b', 'g');
          codeBeforeComment = codeBeforeComment.replace(regex, `<span class="type">${keyword}</span>`);
        });

        return codeBeforeComment + `<span class="coq-comment">${commentText}</span>`;
      } else {
        this.reserved.forEach(keyword => {
          const regex = new RegExp('\\b' + escapeRegExp(keyword) + '\\b', 'g');
          line = line.replace(regex, `<span class="coq-reserved">${keyword}</span>`);
        });

        this.operators.forEach(op => {
          const safeOp = op
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
          const regex = new RegExp(escapeRegExp(op), 'g');
          line = line.replace(regex, `<span class="coq-operator">${safeOp}</span>`);
        });

        this.types.forEach(keyword => {
          const regex = new RegExp('\\b' + escapeRegExp(keyword) + '\\b', 'g');
          line = line.replace(regex, `<span class="type">${keyword}</span>`);
        });

        return line;
      }
    }
  },

  Isabelle: {
    reserved: [
      "theory", "imports", "begin", "end",
      "datatype", "record", "locale", "fixes",
      "assumes", "definition", "where", "and"
    ],
    operators: [
      "≡", "∈", "∉", "≤", "∧", "∨", "∃", "⟶", "∪", " - ", "⇒"
    ],
    types: ["nat", "bool", "seq"],
    highlight: function (line) {
      function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      }

      const commentMatch = line.match(/\(\*.*?\*\)/);
      if (commentMatch) {
        const commentIndex = commentMatch.index;
        let codeBeforeComment = line.slice(0, commentIndex);
        const commentText = line.slice(commentIndex);

        this.reserved.forEach(keyword => {
          const regex = new RegExp('\\b' + escapeRegExp(keyword) + '\\b', 'g');
          codeBeforeComment = codeBeforeComment.replace(regex, `<span class="isabelle-reserved">${keyword}</span>`);
        });
        this.operators.forEach(op => {
          const regex = new RegExp(escapeRegExp(op), 'g');
          codeBeforeComment = codeBeforeComment.replace(regex, `<span class="isabelle-operator">${op}</span>`);
        });
        this.types.forEach(keyword => {
          const regex = new RegExp('\\b' + escapeRegExp(keyword) + '\\b', 'g');
          codeBeforeComment = codeBeforeComment.replace(regex, `<span class="type">${keyword}</span>`);
        });

        return codeBeforeComment + `<span class="coq-comment">${commentText}</span>`;
      } else {
        this.reserved.forEach(keyword => {
          const regex = new RegExp('\\b' + escapeRegExp(keyword) + '\\b', 'g');
          line = line.replace(regex, `<span class="isabelle-reserved">${keyword}</span>`);
        });
        this.operators.forEach(op => {
          const regex = new RegExp(escapeRegExp(op), 'g');
          line = line.replace(regex, `<span class="isabelle-operator">${op}</span>`);
        });
        this.types.forEach(keyword => {
          const regex = new RegExp('\\b' + escapeRegExp(keyword) + '\\b', 'g');
          line = line.replace(regex, `<span class="type">${keyword}</span>`);
        });
        return line;
      }
    }
  },

  Riscal: {
    reserved: [
      "val", "type", "pred", "shared", "system", "var",
      "invariant", "init", "action", "with"
    ],
    types: [
      "Set", "ℕ"
    ],
    operators: [
      " = ", "≤", "⇔", "⇒", "∈", "∅", "∧", "∪", "\\", "¬", ":=", ":"
    ],
    highlight: function (line) {
      function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      }

      const commentMatch = line.match(/\/\/.*/);
      if (commentMatch) {
        const commentIndex = commentMatch.index;
        let codeBeforeComment = line.slice(0, commentIndex);
        const commentText = line.slice(commentIndex);

        this.reserved.forEach(keyword => {
          const regex = new RegExp('\\b' + escapeRegExp(keyword) + '\\b', 'g');
          codeBeforeComment = codeBeforeComment.replace(regex, `<span class="riscal-reserved">${keyword}</span>`);
        });
        this.types.forEach(keyword => {
          const regex = new RegExp('\\b' + escapeRegExp(keyword) + '\\b', 'g');
          codeBeforeComment = codeBeforeComment.replace(regex, `<span class="type">${keyword}</span>`);
        });
        this.operators.forEach(op => {
          const regex = new RegExp(escapeRegExp(op), 'g');
          codeBeforeComment = codeBeforeComment.replace(regex, `<span class="isabelle-operator">${op}</span>`);
        });

        return codeBeforeComment + `<span class="b-comment">${commentText}</span>`;
      } else {
        this.reserved.forEach(keyword => {
          const regex = new RegExp('\\b' + escapeRegExp(keyword) + '\\b', 'g');
          line = line.replace(regex, `<span class="riscal-reserved">${keyword}</span>`);
        });
        this.types.forEach(keyword => {
          const regex = new RegExp('\\b' + escapeRegExp(keyword) + '\\b', 'g');
          line = line.replace(regex, `<span class="type">${keyword}</span>`);
        });
        this.operators.forEach(op => {
          const regex = new RegExp(escapeRegExp(op), 'g');
          line = line.replace(regex, `<span class="isabelle-operator">${op}</span>`);
        });
        return line;
      }
    }
  },

  TLA: {
    reserved: [
      "MODULE", "EXTENDS", "CONSTANTS", "VARIABLES",
      "UNCHANGED", "Init", "Next", "Spec", "Invariant",
      "Cardinality"
    ],
    operators: [
      " = ", " == ",
      "\\in", "\\notin",
      "\\cup",
      "\\subseteq",
      "/\\", "\\/",
      "\\E", "\\A",
      "=>",
      "'",
      "<=", " >= ",
      "_<<", ">> ",
      "::",
      "\\",
    ],
    highlight: function (line) {
      function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      }

      const commentMatch = line.match(/\\\*.*/);
      if (commentMatch) {
        const commentIndex = commentMatch.index;
        let codeBeforeComment = line.slice(0, commentIndex);
        const commentText = line.slice(commentIndex);

        this.reserved.forEach(keyword => {
          const regex = new RegExp('\\b' + escapeRegExp(keyword) + '\\b', 'g');
          codeBeforeComment = codeBeforeComment.replace(regex, `<span class="tla-reserved">${keyword}</span>`);
        });
        this.operators.forEach(op => {
          const regex = new RegExp(escapeRegExp(op), 'g');
          codeBeforeComment = codeBeforeComment.replace(regex, `<span class="isabelle-operator">${op}</span>`);
        });

        return codeBeforeComment + `<span class="b-comment">${commentText}</span>`;
      } else {
        this.reserved.forEach(keyword => {
          const regex = new RegExp('\\b' + escapeRegExp(keyword) + '\\b', 'g');
          line = line.replace(regex, `<span class="tla-reserved">${keyword}</span>`);
        });
        this.operators.forEach(op => {
          const regex = new RegExp(escapeRegExp(op), 'g');
          line = line.replace(regex, `<span class="isabelle-operator">${op}</span>`);
        });
        return line;
      }
    }
  },

  VDM: {
    reserved: [
      "values", "types", "state", "inv",
      "init", "end", "operations",
      "pre", "post", "ext", "wr",
    ],
    types: [
      "nat", "nat1", "set"
    ],
    operators: [
      " = ", ":=", "=>", "and", "union", "\\", "~"
    ],
    highlight: function (line) {
      function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      }

      const commentMatch = line.match(/--.*/);
      if (commentMatch) {
        const commentIndex = commentMatch.index;
        let codeBeforeComment = line.slice(0, commentIndex);
        const commentText = line.slice(commentIndex);

        this.reserved.forEach(keyword => {
          const regex = new RegExp('\\b' + escapeRegExp(keyword) + '\\b', 'g');
          codeBeforeComment = codeBeforeComment.replace(regex, `<span class="vdm-reserved">${keyword}</span>`);
        });
        this.types.forEach(keyword => {
          const regex = new RegExp('\\b' + escapeRegExp(keyword) + '\\b', 'g');
          codeBeforeComment = codeBeforeComment.replace(regex, `<span class="type">${keyword}</span>`);
        });
        this.operators.forEach(op => {
          const regex = new RegExp(escapeRegExp(op), 'g');
          codeBeforeComment = codeBeforeComment.replace(regex, `<span class="vdm-operator">${op}</span>`);
        });

        codeBeforeComment = codeBeforeComment.replace(/<([a-zA-Z0-9_]+)>/g, (fullMatch, group1) => {
          return `<span>&lt;${group1}&gt;</span>`;
        });

        return codeBeforeComment + `<span class="b-comment">${commentText}</span>`;
      } else {
        this.reserved.forEach(keyword => {
          const regex = new RegExp('\\b' + escapeRegExp(keyword) + '\\b', 'g');
          line = line.replace(regex, `<span class="vdm-reserved">${keyword}</span>`);
        });
        this.types.forEach(keyword => {
          const regex = new RegExp('\\b' + escapeRegExp(keyword) + '\\b', 'g');
          line = line.replace(regex, `<span class="type">${keyword}</span>`);
        });
        this.operators.forEach(op => {
          const regex = new RegExp(escapeRegExp(op), 'g');
          line = line.replace(regex, `<span class="vdm-operator">${op}</span>`);
        });

        line = line.replace(/<([a-zA-Z0-9_]+)>/g, (fullMatch, group1) => {
          return `<span>&lt;${group1}&gt;</span>`;
        });

        return line;
      }
    }
  }
};


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

shuffleArray(filePaths);

const pages = [
  { type: 'start' },
  ...filePaths.map(path => ({ type: 'file', path })),
  { type: 'end' }
];

let currentIndex = 0;

function highlightLineByLanguage(line, lang) {
  if (syntaxHighlightingRules[lang] && typeof syntaxHighlightingRules[lang].highlight === 'function') {
    return syntaxHighlightingRules[lang].highlight(line);
  }
  return line;
}

function renderCode(text, fileName) {
  const lines = text.split('\n');
  const container = document.getElementById('editorContainer');
  container.innerHTML = '';
  const langName = methodNameMapping[fileName] || 'default';
  const lang = languageMapping[fileName] || 'default';
  const header = document.createElement('h3');
  header.className = 'formal-method-name';
  header.textContent = `Formal method: ${langName}`;
  container.appendChild(header);
  lines.forEach((line, index) => {
    const editorLine = document.createElement('div');
    editorLine.className = 'editor-line';
    const lineNumberElem = document.createElement('div');
    lineNumberElem.className = 'line-number';
    lineNumberElem.textContent = index + 1;
    const lineCodeElem = document.createElement('div');
    lineCodeElem.className = 'line-code';
    lineCodeElem.innerHTML = highlightLineByLanguage(line, lang);
    editorLine.appendChild(lineNumberElem);
    editorLine.appendChild(lineCodeElem);
    container.appendChild(editorLine);
  });
}

function renderStartPage() {
  const container = document.getElementById('editorContainer');
  container.innerHTML = `
    <h2>Welcome!</h2>

<p>
  My bachelor's thesis explores the use of formal methods to develop verifiable
  software applications.
</p>
<p>
  Formal methods are mathematically-based techniques used to specify, develop,
  and verify both software and hardware systems. They enable designers to rigorously
  prove the correctness, safety, and reliability of a system, making them particularly
  valuable in safety-critical domains such as aerospace, medical devices, and finance.
</p>
    <p>
      In this study, you will review <strong>6</strong> specifications describing the same “Parking” system,
      each written with a different formal method. The goal is to understand how
      accessible and comprehensible these specifications are for developers.
      After you have read them, you will be asked to fill out a brief questionnaire.
    </p>
    <p>
      The “Parking” system manages a limited number of spaces and includes four main operations:
    </p>
    <ul>
      <li>Opening the car parking</li>
      <li>Closing the car parking</li>
      <li>A car arrives</li>
      <li>A car leaves</li>
    </ul>
<p>
  Each specification also highlights the notion of an <strong>invariant</strong> —
  a system constraint that must hold in every state. You will encounter 2 main
  invariants :
  <ul> 
    <li><em>The number of parked cars never exceeds the parking’s capacity.</em></li>
    <li><em>When the parking lot is closed, there are no cars present.</em></li>
  </ul> 
  As you review
  each code, pay attention to how the operations and invariants are described in the
  different formal notations.
    <p>
      The main variables that appear in the formal specifications include:
    </p>
    <ul>
      <li><strong>capacity</strong> – The maximum number of cars that can be parked at once.</li>
      <li><strong>maxCarId</strong> – The highest valid identifier a car can have.</li>
      <li><strong>parkingState</strong> – Either <code>"opened"</code> or <code>"closed"</code>, indicating the current status of the parking lot.</li>
      <li><strong>cars</strong> – A collection or set of currently parked car identifiers.</li>
    </ul>
</p>
    <p>
      Please click <strong>"Go to specs"</strong> to begin reviewing the specification files
      in a random order.
    </p>
  `;
}

function renderEndPage() {
  const container = document.getElementById('editorContainer');
  container.innerHTML = `
      <h2>Thank you for reviewing the specs!</h2>
      <p>Please fill out the survey:
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSdCtcahNvERFtuD5TzLaQmCe4Kpzh8L2lhrnv3bFjOTiu1I3A/viewform?usp=sharing" target="_blank">Go to survey</a>
      </p>
    `;
}

function fetchFileAndRender(path) {
  const container = document.getElementById('editorContainer');
  container.innerHTML = '<p>Loading file...</p>';
  fetch(`spec/${path}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load ${path}: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      renderCode(data, path);
    })
    .catch(err => {
      console.error(err);
      container.innerHTML = `<p style="color:red;">Error loading file: ${err.message}</p>`;
    });
}
function loadPage(index) {
  const page = pages[index];
  if (page.type === 'start') {
    renderStartPage();
  } else if (page.type === 'end') {
    renderEndPage();
  } else if (page.type === 'file') {
    fetchFileAndRender(page.path);
  }
  updatePagination();
}

function updatePagination() {
  const pageInfo = document.getElementById('pageInfo');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const paginationContainer = document.querySelector('.pagination');
  const currentPage = pages[currentIndex];

  paginationContainer.classList.remove('single-button');

  if (currentPage.type === 'file') {
    pageInfo.style.display = 'inline-block';
    pageInfo.textContent = `Spec ${currentIndex} of ${filePaths.length}`;
    prevBtn.style.display = 'inline-block';
    nextBtn.style.display = 'inline-block';
    prevBtn.style.margin = '';
    nextBtn.style.margin = '';
    paginationContainer.classList.remove('single-button');

    if (currentIndex === 1) {
      prevBtn.textContent = 'Return to start';
    } else {
      prevBtn.textContent = 'Previous spec';
    }
    if (currentIndex === pages.length - 2) {
      nextBtn.textContent = 'Finish specs';
    } else {
      nextBtn.textContent = 'Next spec';
    }
  } else {
    pageInfo.style.display = 'none';
    paginationContainer.classList.add('single-button');
    if (currentPage.type === 'start') {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'block';
      nextBtn.style.margin = '0 auto';
      nextBtn.textContent = 'Go to specs';
    } else if (currentPage.type === 'end') {
      nextBtn.style.display = 'none';
      prevBtn.style.display = 'block';
      prevBtn.style.margin = '0 auto';
      prevBtn.textContent = 'Get back to specs';
    }
  }
}



document.getElementById('prevBtn').addEventListener('click', () => {
  const currentPage = pages[currentIndex];
  if (currentPage.type === 'end') {
    currentIndex = 1;
    loadPage(currentIndex);
  } else if (currentPage.type === 'file' && currentIndex === 1) {
    currentIndex = 0;
    loadPage(currentIndex);
  } else if (currentIndex > 0) {
    currentIndex--;
    loadPage(currentIndex);
  }
});

document.getElementById('nextBtn').addEventListener('click', () => {
  const currentPage = pages[currentIndex];
  if (currentPage.type === 'start') {
    currentIndex = 1;
    loadPage(currentIndex);
  } else if (currentPage.type === 'file' && currentIndex === pages.length - 2) {
    currentIndex = pages.length - 1;
    loadPage(currentIndex);
  } else if (currentIndex < pages.length - 1) {
    currentIndex++;
    loadPage(currentIndex);
  }
});

loadPage(currentIndex);