import React, { useState } from 'react';

export const filmsList = [
    {
      "id": 1,
      "title": "The Final Cut",
      "url": "https://www.youtube.com/embed/i7lJqNQbrY8?si=zVvzyEdQH6nOzYQw",
      "director": "",
      "cast": "",
      "synopsis": "The Final Cut is a chilling tale of a lonely woman who finds herself trapped in an eerie, desolate forest. As she navigates the dark, twisting paths, she becomes increasingly aware of a sinister presence lurking in the shadows. With every step, the forest tightens its grip, and the line between reality and nightmare blurs. What fate awaits her in this haunting wilderness? The Final Cut is a suspenseful short film that keeps viewers on edge, questioning what is real and what lies beyond the darkness."
    },
    {
      "id": 2,
      "title": "Potteh Kumar",
      "url": "https://www.youtube.com/embed/jTDL2ebrj1w?si=pLx2XSoG6sRyChJp",
      "director": "",
      "cast": "",
      "synopsis": "Story of a young boy who undergo an emotional roller coaster after the death of his pet dog."
    },
    {
      "id": 3,
      "title": "YAATHIRAI",
      "url": "https://www.youtube.com/embed/JZrBK4UKeiw?si=TUYa9TOcP0vlcacT",
      "director": "",
      "cast": "",
      "synopsis": "When Yatra is asked the simple yet profound question, \"Do you know the difference between being alone and lonely?\" he's compelled to reflect on his past, particularly his relationship with Yazhini. As he takes a trip down memory lane, Yatra revisits the moments they shared, searching for the point where everything started to unravel. Through his introspection, Yatra confronts the complexities of love, loss, and the subtle line between solitude and loneliness. Alone or Lonely? is a poignant short film that explores the impact of unspoken emotions and the search for closure in the wake of a broken connection."
    },
    {
      "id": 4,
      "title": "Amaram",
      "url": "https://www.youtube.com/embed/Xqn4QaDz1Wo?si=Of0l7WQirryNpW8G",
      "director": "Bharathan",
      "cast": "Mohanlal, Parvathy, Thilakan",
      "synopsis": "A man struggles to balance his love for two women. He faces a moral dilemma and must choose between his heart and his head. "
    },
    {
      "id": 5,
      "title": "Devaadoothan",
      "url": "https://www.youtube.com/embed/jb5FMCr1rSc?si=Y3yNVb9eF_Y0A72T",
      "director": "Sibi Malayil",
      "cast": "Mohanlal, Shobana, Thilakan",
      "synopsis": "A man falls in love with a woman who is already married. He faces many challenges in his quest for love. "
    },
    {
      "id": 6,
      "title": "Premam",
      "url": "https://www.youtube.com/embed/yjaFvFuQ-QM?si=GzjXcLTxr8rpGxQI",
      "director": "Alphonse Puthren",
      "cast": "Nivin Pauly, Sai Pallavi, Madonna Sebastian",
      "synopsis": "A coming-of-age story about a man who falls in love at different stages of his life. He learns about love, loss, and life. "
    },
    {
      "id": 7,
      "title": "Kumbalangi Nights",
      "url": "https://www.youtube.com/embed/bNyKd0PUx04?si=A-8wRwQ54z6HdxZ1",
      "director": "Madhu C. Narayanan",
      "cast": "Shane Nigam, Soubin Shahir, Sreenath Bhasi",
      "synopsis": "A story about four brothers who face a crisis in their lives. They must learn to work together to overcome their problems. "
    },
    {
      "id": 8,
      "title": "Drishyam",
      "url": "https://www.youtube.com/embed/iGCkQi-QziE?si=3rJ3S_7M0NIoFGmF",
      "director": "Jeethu Joseph",
      "cast": "Mohanlal, Meena, Asha Sarath",
      "synopsis": "A man is accused of murder and he must use his intelligence and cunning to protect his family from the police. "
    },
    {
      "id": 9,
      "title": "New Delhi",
      "url": "https://www.youtube.com/embed/uB_S8Uf0n4U?si=zjQTGBf170V2aWGX",
      "director": "Sibi Malayil",
      "cast": "Mohanlal, Shobana, Thilakan",
      "synopsis": "A suspenseful story about a man who gets caught in a web of intrigue and danger. He fights to clear his name and protect his loved ones. "
    },
  
  ];